"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname for safety
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      // 🟢 FIX: Redirect to "/login" (Frontend Route), NOT "/auth/login"
      // Also prevent infinite loop if already on login page
      if (pathname !== "/login") {
        router.push("/login"); 
      }
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  if (!authorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0B0D10]">
        <Loader2 className="h-8 w-8 animate-spin text-[#B6FF3B]" />
      </div>
    );
  }

  return <>{children}</>;
}