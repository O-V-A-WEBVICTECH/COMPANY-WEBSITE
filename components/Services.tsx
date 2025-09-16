import { JSX } from "react";
function Services(): JSX.Element {
  const services = [
    {
      title: "Web Problem Detection",
      description:
        "Our Qwen3 AI scans your website to identify performance issues, security vulnerabilities, and UX problems.",
      action: "Free Preview",
    },
    {
      title: "AI-Powered Fixes",
      description:
        "Automatically resolve detected issues with our intelligent Qwen3 AI solutions for optimal performance.",
      action: "Paid Service",
    },
    {
      title: "Website Creation",
      description:
        "Generate complete website UIs with our Qwen3 AI. Perfect for new businesses and startups.",
      action: "Free Preview",
    },
    {
      title: "UI Download",
      description:
        "Download the generated UI code for your new website and implement it with ease.",
      action: "Paid Service",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Qwen3-Powered AI Services
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Discover how Alibaba Cloud&apos;s Qwen3 AI technology can transform
          your web experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className="text-blue-600 font-medium hover:underline">
                {service.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
