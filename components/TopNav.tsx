import Link from "next/link";
import { Ticket, Search, User } from "lucide-react";

export function TopNav() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Ticket className="h-8 w-8 transform rotate-[-15deg]" />
              <span className="text-3xl font-extrabold tracking-wider">
                EventKita
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <Link href="/events" className="hover:text-yellow-300 transition-colors duration-300">
              Explore
            </Link>
            <Link href="/create" className="hover:text-yellow-300 transition-colors duration-300">
              Create Event
            </Link>
            <Link href="/about" className="hover:text-yellow-300 transition-colors duration-300">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
              <Search className="h-6 w-6" />
            </button>
            <Link href="/login" className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
              <User className="h-6 w-6" />
              <span className="hidden lg:block">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
