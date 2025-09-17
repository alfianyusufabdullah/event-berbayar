import Link from "next/link";

export function TopNav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-2xl font-bold">
          ikut-devcoach
        </Link>
      </div>
    </nav>
  );
}
