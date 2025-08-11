"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BarChart2, MessageSquare, Settings, Layout } from "lucide-react";

export default function Dashboard() {
  const pathname = usePathname();
  

  const navLinks = [
    { href: "/content", label: "Feed", icon: Home },
    { href: "/overview", label: "Overview", icon: Layout },
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/comments", label: "Comments", icon: MessageSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      <aside className="w-full bg-gradient-to-b from-white to-gray-100 border-r border-gray-200 shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)] p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">📖 My Blog</h1>
        <nav className="flex flex-col gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href === "/content" && pathname === "/dashboard"); 
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-secondary bg-opacity-30 text-secondary font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
