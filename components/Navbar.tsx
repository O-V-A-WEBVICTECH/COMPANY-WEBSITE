import { JSX } from "react";
import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              O.V.A WebvicTech QWEN3
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/#about" },
              { label: "Our Team", href: "/#team" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/#careers" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
