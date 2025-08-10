import Link from "next/link";

export default function Dashboard() {
  const navLinks = [
    { href: "/content", label: "Feed" },
    { href: "/overview", label: "Overview" },
    { href: "/posts", label: "Posts" },
    { href: "/analytics", label: "Analytics" },
    { href: "/comments", label: "Comments" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex h-full bg-gray-100">
      <aside className="w-full shadow-lg p-5">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <nav className="flex flex-col gap-3 text-gray-700">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} legacyBehavior>
              <a className="hover:text-black">{label}</a>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
