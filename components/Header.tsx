"use client";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
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
    <header className="fixed w-full bg-white shadow z-30">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-blue-600">
              O.V.A <span className="text-indigo-600">WebvicTech</span>
            </h1>
            <span className="ml-2 inline-block bg-qwen text-white text-xs px-2 py-0.5 rounded-full">
              QWEN3
            </span>
          </div>

          <ul className="hidden md:flex items-center gap-8 text-slate-700">
            <li>
              <a href="#home" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-blue-600">
                Our Team
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600">
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
                <button
                  onClick={handleAuthAction}
                  className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAuthAction}
                  className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/pricing")}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <i className={`fas ${open ? "fa-times" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-3 text-slate-700 mb-4">
              <li>
                <a
                  href="#home"
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : loggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleAuthAction();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleAuthAction();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/pricing");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
