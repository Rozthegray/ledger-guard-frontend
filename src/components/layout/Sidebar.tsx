import Link from "next/link";
import { LayoutDashboard, UploadCloud, Settings, CreditCard, BrainCircuit } from "lucide-react";

const routes = [
  { label: "Overview", icon: LayoutDashboard, href: "/", color: "text-sky-500" },
  { label: "AI Ingestion", icon: UploadCloud, href: "/upload", color: "text-violet-500" },
  { label: "Billing", icon: CreditCard, href: "/billing", color: "text-pink-700" },
  { label: "Settings", icon: Settings, href: "/settings", color: "text-gray-500" },
];

export function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex items-center pl-8 mb-8">
        <BrainCircuit className="h-8 w-8 mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Ledger Guard</h1>
      </div>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <div className="flex items-center flex-1 px-4">
              <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}