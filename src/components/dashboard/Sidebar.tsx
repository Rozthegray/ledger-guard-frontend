"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  User,
  Bell 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tool (Ingest)", href: "/dashboard/upload", icon: UploadCloud },
  { name: "Audit Logs", href: "/dashboard/logs", icon: FileText },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface UserProfile {
  full_name: string;
  plan: string;
  company_name?: string;
}

interface SidebarProps {
  className?: string;
  onClose?: () => void;
  user?: UserProfile | null;
}

// 🟢 CRITICAL: This must be a named export "export function Sidebar"
export function Sidebar({ className, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#0B0D10] border-r border-white/10 relative z-50", className)}>
      
      {/* 1. Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(182,255,59,0.2)]">
          <ShieldCheck className="text-black h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Ledger Guard</span>
      </div>

      {/* 2. Main Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          // Fix: Check if pathname starts with href (for sub-pages) but ensure exact match for root dashboard
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard"
            : pathname?.startsWith(item.href);

          return (
            <Link 
              key={item.name} 
              href={item.href}
              // Fix: Only attach onClick if onClose exists (prevents undefined handler issues)
              onClick={onClose ? () => onClose() : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer relative",
                isActive 
                  ? "bg-[#B6FF3B] text-black shadow-[0_0_15px_rgba(182,255,59,0.3)] font-bold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-black" : "text-slate-500")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* 3. User & Logout */}
      <div className="p-4 border-t border-white/10 bg-[#0F1216] shrink-0 mt-auto">
        <div className="bg-[#1A1F26] rounded-xl p-3 flex items-center gap-3 mb-3 border border-white/5">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-white/10 shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">
                {user?.full_name || "User"}
            </p>
            <p className="text-xs text-slate-500 truncate capitalize">
                {user?.plan || "Free"} Plan
            </p>
          </div>
        </div>
        
        <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-500/20 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}