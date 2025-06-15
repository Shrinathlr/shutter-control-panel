
import { 
  Users, 
  Calendar, 
  AlertCircle, 
  Settings, 
  DollarSign, 
  Bell, 
  Shield, 
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Disputes",
    url: "/admin/disputes",
    icon: AlertCircle,
  },
  {
    title: "Commissions",
    url: "/admin/commissions",
    icon: Settings,
  },
  {
    title: "Finance",
    url: "/admin/finance",
    icon: DollarSign,
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "KYC Review",
    url: "/admin/kyc",
    icon: Shield,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center gap-2">
          {/* New Logo image */}
          <img
            src="/lovable-uploads/54b43b15-e7cb-45d8-bcec-80bfa62d97dd.png"
            alt="Reels Studio Logo"
            className="w-16 h-16 object-contain mb-2 drop-shadow-md"
            draggable={false}
          />
          <span className="text-xl font-extrabold text-sidebar-foreground tracking-wide">REELSSTUDIOS</span>
          <span className="text-sm text-sidebar-foreground/60 -mt-1">Super Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-semibold">
            Platform Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`group ${
                      location.pathname === item.url 
                        ? 'bg-sidebar-accent text-sidebar-primary border-l-2 border-sidebar-primary' 
                        : 'hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className={`w-5 h-5 ${
                        location.pathname === item.url 
                          ? 'text-sidebar-primary' 
                          : 'text-sidebar-foreground/70'
                      }`} />
                      <span className={`font-medium ${
                        location.pathname === item.url 
                          ? 'text-sidebar-primary' 
                          : 'text-sidebar-foreground'
                      }`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

