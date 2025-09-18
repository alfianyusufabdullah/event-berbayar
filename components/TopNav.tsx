import Link from "next/link";

export function TopNav() {
  return (
    <nav className="text-slate-900 shadow p-4">
      <div className="container mx-auto px-28">
        <Link href="/" className="text-2xl font-bold">
          Event Berbayar
        </Link>
      </div>
    </nav>
  );
}
