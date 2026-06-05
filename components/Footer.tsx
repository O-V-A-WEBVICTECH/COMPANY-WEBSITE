import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">WebvicTech</h4>
          <p className="text-xs text-slate-400">
            Custom web solutions built to optimize performance, security, and
            user experience for your business.
          </p>
          <div className="flex gap-3 mt-4">
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="text-xs">
          <h5 className="font-semibold mb-3">Company</h5>
          <ul className="text-slate-400 space-y-2">
            <li>
              <a>About</a>
            </li>

            <li>
              <a>Blog</a>
            </li>
          </ul>
        </div>

        <div className="text-xs">
          <h5 className="font-semibold mb-3">Services</h5>
          <ul className="text-slate-400 space-y-2">
            <li>
              <a>Analysis</a>
            </li>
            <li>
              <a>Performance</a>
            </li>
            <li>
              <a>Website Creation</a>
            </li>
          </ul>
        </div>

        <div className="text-xs">
          <h5 className="font-semibold mb-3">Contact</h5>
          <div className="text-slate-400">o.v.a.webvictech@gmail.com</div>
          <div className="text-slate-400 mt-2">+234 (913) 660-0887</div>
        </div>
      </div>

      <div className="mt-8 text-xs text-center text-slate-500">
        © {new Date().getFullYear()} WebvicTech. All
        rights reserved.
      </div>
    </footer>
  );
}
