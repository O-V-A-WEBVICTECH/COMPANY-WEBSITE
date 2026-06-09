import { JSX } from "react";
import Image from "next/image";


export default function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/ova-logo.png"
              alt="O.V.A WebvicTech Logo"
              width={56}
              height={56}
              className="rounded-full ring-2 ring-white/20"
            />
            <div>
              <h4 className="text-base font-bold leading-tight">O.V.A WebvicTech</h4>
              <p className="text-[10px] text-slate-400 leading-tight">INT&apos; SERVICE LIMITED</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Custom web solutions built to optimize performance, security, and
            user experience for your business.
          </p>
          <div  className="flex gap-3 mt-4">
            <a target="_blank" href="https://www.instagram.com/webvictech?igsh=cW45a2c2aDF2eHl3&utm_source=qr" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
              <i className="fab fa fa-instagram"></i>
            </a>
            <a href="https://vt.tiktok.com/ZSQjUvdvb" target="_blank" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
              <i className="fab fa-tiktok"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/victor-olaiya-45a782255?utm_source=share_via&utm_content=profile&utm_medium=member_ios" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600">
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
          <div className="text-slate-400 mt-2">+2349136600887</div>
        </div>

         
      </div>

      <div className="mt-8 text-xs text-center text-slate-500">
        © {new Date().getFullYear()} O.V.A WebvicTech. All rights reserved.
      </div>
    </footer>
  );
}
