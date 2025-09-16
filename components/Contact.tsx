"use client";
import { JSX, useState } from "react";

export default function Contact(): JSX.Element {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-slate-600 mt-2">
            Have questions or want to learn more about our services? Contact us
            today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Let&apos;s Talk</h3>
            <p className="text-slate-600 mb-6">
              Whether you have a question about our services, want to discuss a
              project, or just want to say hello, our team is here to help.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-slate-600">
                    123 Tech Street, Digital City, CA 94103
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-slate-600">info@ovawebvictech.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              {status === "sent" ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  Thanks — we received your message.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      required
                      className="w-full p-3 rounded border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 rounded border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subject</label>
                    <input
                      required
                      className="w-full p-3 rounded border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Message</label>
                    <textarea
                      required
                      className="w-full p-3 rounded border border-slate-200 min-h-[120px]"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-qwen text-white px-4 py-2 rounded"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
