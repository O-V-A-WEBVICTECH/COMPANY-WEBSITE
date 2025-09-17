import { JSX } from "react";

export default function Features(): JSX.Element {
  const items = [
    {
      title: "Web Problem Detection",
      icon: "fa-bug",
      text: "Scans your website to identify performance issues, security vulnerabilities, and UX problems.",
      badge: "Free Preview",
    },
    {
      title: "AI-Powered Fixes",
      icon: "fa-wrench",
      text: "Automatically resolve detected issues with our intelligent Qwen3 AI solutions.",
      badge: "Paid Service",
      important: true,
    },
    {
      title: "Website Creation",
      icon: "fa-laptop-code",
      text: "Generate complete website UIs with our Qwen3 AI. Perfect for startups.",
      badge: "Free Preview",
    },
    {
      title: "UI Download",
      icon: "fa-download",
      text: "Download the generated UI code for your new website and implement it easily.",
      badge: "Paid Service",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Qwen3-Powered AI Services</h2>
          <p className="mt-2 text-slate-600">
            Discover how O.V.A.WEBVICTECH can transform your web experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white text-2xl mb-4">
                <i className={`fas ${it.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-slate-600">{it.text}</p>
              <span
                className={`inline-block mt-4 text-sm px-3 py-1 rounded-full ${
                  it.important
                    ? "bg-indigo-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {it.badge}
              </span>
              {it.important && (
                <span className="absolute top-4 right-4 bg-qwen text-white text-xs px-2 py-1 rounded-full font-bold">
                  QWEN3
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
