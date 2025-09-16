import { JSX } from "react";

export default function HowItWorks(): JSX.Element {
  const steps = [
    {
      title: "Website Analysis",
      text: "Submit your website URL for our  AI to analyze performance and identify issues.",
    },
    {
      title: "Preview Report",
      text: "Receive a free detailed report of detected problems and potential improvements.",
    },
    {
      title: "AI Implementation",
      text: "Our  AI automatically fixes issues or generates your new website UI (paid service).",
    },
    {
      title: "Download & Deploy",
      text: "Download the fixed code or new UI and deploy to your hosting platform.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            How Our Team + AI Solution Work
          </h2>
          <p className="mt-2 text-slate-600">
            Simple steps to transform your web presence with
            O.V.A.WEBVICTECH&apos;s Team and artificial intelligence
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-between">
          {steps.map((s, i) => (
            <div
              key={i}
              className="w-full md:w-[calc(25%-12px)] bg-white p-6 rounded-lg shadow text-center"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
