import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import BookingsPage from "./pages/admin/Bookings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DisputesPage from "./pages/admin/Disputes";
import CommissionsPage from "./pages/admin/Commissions";
import FinancePage from "./pages/admin/Finance";
import NotificationsPage from "./pages/admin/Notifications";
import KYCPage from "./pages/admin/KYC";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="disputes" element={<DisputesPage />} />
                <Route path="commissions" element={<CommissionsPage />} />
                <Route path="finance" element={<FinancePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="kyc" element={<KYCPage />} />
                {/* Additional admin routes will be added here */}
              </Routes>
            </AdminLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
