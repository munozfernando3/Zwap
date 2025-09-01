"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, School, FolderTree } from "lucide-react";

type Item = { href: string; label: string; icon?: React.ReactNode };

const NAV: Item[] = [
  { href: "/admin",            label: "Dashboard",  icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/admin/campus",     label: "Campuses",   icon: <School className="h-4 w-4" /> },
  { href: "/admin/categories", label: "Categories", icon: <FolderTree className="h-4 w-4" /> },
  // add more later (Listings, Users, Reports…)
];



function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:w-64 flex-col gap-2 p-4 border-r border-neutral-800">
      <div className="px-1 pb-2">
        <Link href="/admin" className="text-lg font-semibold">Admin</Link>
        <p className="text-xs text-neutral-400">Manage your marketplace</p>
      </div>
      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
  const isDashboard = item.href === "/admin";

  const active = isDashboard
    ? pathname === "/admin"                   // only the exact dashboard route
    : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      key={item.href}
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm
        ${active ? "bg-neutral-900 text-white" : "text-neutral-300 hover:bg-neutral-900/80"}`}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
})}

      </nav>
      <div className="mt-auto text-xs text-neutral-500 px-1">v0.1</div>
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Topbar (mobile) */}
      <header className="md:hidden sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link href="/admin" className="font-semibold">Admin</Link>
          <Link href="/admin/campus" className="text-sm underline">Menu</Link>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
