
-- First, create all required types and tables if they don't exist.

-- USER ROLES TYPE
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END$$;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  photographer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DISPUTES TABLE
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.users(id),
  against_user UUID REFERENCES public.users(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DISPUTE EVIDENCE TABLE
CREATE TABLE IF NOT EXISTS public.dispute_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES public.disputes(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  url TEXT,
  text TEXT,
  uploaded_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- KYC SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.kyc_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- KYC DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.kyc_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_id UUID REFERENCES public.kyc_submissions(id) ON DELETE CASCADE,
  url TEXT,
  type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- COMMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  country TEXT NOT NULL,
  value NUMERIC NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FINANCE TABLE
CREATE TABLE IF NOT EXISTS public.finance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_role TEXT,
  to_user UUID REFERENCES public.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Now, enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to ensure idempotency
DROP POLICY IF EXISTS "User can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Clients & photographers can view their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Clients can insert their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Clients & photographers can update their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Clients & photographers can delete their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Participants can view their disputes" ON public.disputes;
DROP POLICY IF EXISTS "Participants can insert disputes" ON public.disputes;
DROP POLICY IF EXISTS "Participants can update their disputes" ON public.disputes;
DROP POLICY IF EXISTS "Dispute parties can view evidence" ON public.dispute_evidence;
DROP POLICY IF EXISTS "Dispute parties can insert evidence" ON public.dispute_evidence;
DROP POLICY IF EXISTS "Users can view their KYC" ON public.kyc_submissions;
DROP POLICY IF EXISTS "Users can insert KYC" ON public.kyc_submissions;
DROP POLICY IF EXISTS "Users can update their KYC" ON public.kyc_submissions;
DROP POLICY IF EXISTS "Linked KYC owners can view documents" ON public.kyc_documents;
DROP POLICY IF EXISTS "Linked KYC owners can insert documents" ON public.kyc_documents;
DROP POLICY IF EXISTS "All users can view commissions" ON public.commissions;
DROP POLICY IF EXISTS "Admins can insert/update/delete commissions" ON public.commissions;
DROP POLICY IF EXISTS "Admins can view finance" ON public.finance;
DROP POLICY IF EXISTS "Admins can modify finance" ON public.finance;
DROP POLICY IF EXISTS "Users can view their notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can send notifications" ON public.notifications;

-- Finally, recreate all policies
-- user_roles
CREATE POLICY "User can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- bookings
CREATE POLICY "Clients & photographers can view their bookings" ON public.bookings FOR SELECT USING (auth.uid() = client_id OR auth.uid() = photographer_id);
CREATE POLICY "Clients can insert their bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients & photographers can update their bookings" ON public.bookings FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = photographer_id);
CREATE POLICY "Clients & photographers can delete their bookings" ON public.bookings FOR DELETE USING (auth.uid() = client_id OR auth.uid() = photographer_id);

-- disputes
CREATE POLICY "Participants can view their disputes" ON public.disputes FOR SELECT USING (auth.uid() = created_by OR auth.uid() = against_user);
CREATE POLICY "Participants can insert disputes" ON public.disputes FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Participants can update their disputes" ON public.disputes FOR UPDATE USING (auth.uid() = created_by);

-- dispute_evidence
CREATE POLICY "Dispute parties can view evidence" ON public.dispute_evidence FOR SELECT USING (EXISTS (SELECT 1 FROM public.disputes WHERE id = dispute_id AND (auth.uid() = created_by OR auth.uid() = against_user)));
CREATE POLICY "Dispute parties can insert evidence" ON public.dispute_evidence FOR INSERT WITH CHECK (uploaded_by = auth.uid());

-- kyc_submissions
CREATE POLICY "Users can view their KYC" ON public.kyc_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert KYC" ON public.kyc_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their KYC" ON public.kyc_submissions FOR UPDATE USING (auth.uid() = user_id);

-- kyc_documents
CREATE POLICY "Linked KYC owners can view documents" ON public.kyc_documents FOR SELECT USING (EXISTS (SELECT 1 FROM public.kyc_submissions WHERE id = kyc_id AND auth.uid() = user_id));
CREATE POLICY "Linked KYC owners can insert documents" ON public.kyc_documents FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.kyc_submissions WHERE id = kyc_id AND auth.uid() = user_id));

-- commissions
CREATE POLICY "All users can view commissions" ON public.commissions FOR SELECT USING (true);
CREATE POLICY "Admins can insert/update/delete commissions" ON public.commissions FOR ALL USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- finance
CREATE POLICY "Admins can view finance" ON public.finance FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can modify finance" ON public.finance FOR ALL USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- notifications
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (to_user IS NULL OR to_user = auth.uid() OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND to_role::public.app_role = role));
CREATE POLICY "Admins can send notifications" ON public.notifications FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
