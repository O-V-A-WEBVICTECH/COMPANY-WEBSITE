"use client";
import { JSX, useState } from "react";

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
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
              <a href="#careers" className="hover:text-blue-600">
                Careers
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <i className={`fas ${open ? "fa-times" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </nav>
        {open && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-3 text-slate-700">
              <li>
                <a href="#home" className="block">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="block">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#blog" className="block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="block">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
