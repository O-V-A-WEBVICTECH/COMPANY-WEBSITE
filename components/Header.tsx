"use client";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkAuth();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) return setLoggedIn(true);
    } catch (error) {
      console.error("Error checking auth:", error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthAction = async () => {
    const session = await authClient.getSession();
    const user = session?.data?.user;
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      return checkAuth();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <h1 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                O.V.A
              </span>{" "}
              <span className="text-slate-800">WebvicTech</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-slate-700">
            <li>
              <a href="#home" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-blue-600 transition-colors"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#services"
                className="block py-2 hover:text-blue-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Services
              </a>
            </li>

            <li>
              <a
                href="#portfolio"
                className="hover:text-blue-600 transition-colors"
              >
                Portfolio
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : loggedIn ? (
              <>
                <Button
                  onClick={handleAuthAction}
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Dashboard
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleAuthAction}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-1 text-slate-700 mb-4">
              <li>
                <a
                  href="#home"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  About
                </a>
              </li>

              {/* Mobile Services */}
              <li>
                <a
                  href="#services"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#portfolio"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Portfolio
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-200">
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : loggedIn ? (
                <>
                  <Button
                    onClick={() => {
                      handleAuthAction();
                      setOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      handleAuthAction();
                      setOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/register");
                      setOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
