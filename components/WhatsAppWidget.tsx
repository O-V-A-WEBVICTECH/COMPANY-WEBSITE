import { JSX } from "react";

export default function WhatsAppWidget(): JSX.Element {
  return (
    <a
      href="https://wa.me/message/3SRXQ7HYZ42FB1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      {/* Tooltip */}
      <span className="hidden group-hover:flex items-center bg-white text-slate-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-slate-100 whitespace-nowrap transition-all duration-200">
        Chat with us
      </span>

      {/* Button */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20bd5a] transition-colors duration-200">
        {/* Ping animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-50 animate-ping" />
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="white"
          className="w-8 h-8 relative z-10"
          aria-hidden="true"
        >
          <path d="M24 4C12.95 4 4 12.95 4 24c0 3.6.97 7.04 2.67 10.02L4 44l10.3-2.63A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36a16 16 0 0 1-8.15-2.23l-.58-.35-6.1 1.56 1.6-5.94-.38-.6A15.95 15.95 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.77-11.87c-.48-.24-2.83-1.4-3.27-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.75-3.86-2.38-1.43-1.27-2.4-2.84-2.68-3.32-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.83-1.16 3.23-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
        </svg>
      </div>
    </a>
  );
}
