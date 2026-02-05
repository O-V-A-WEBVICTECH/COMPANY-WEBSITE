"use client";
import { JSX, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Contact(): JSX.Element {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section
      id="contact"
      className="pb-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Mail className="w-4 h-4 mr-2" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Contact Us
            </span>
          </Badge>

          <h2 className="text-2xl md:text-5xl font-bold text-slate-900">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions or want to learn more about our services? Contact us
            today and let&apos;s discuss how we can help bring your vision to
            life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Let&apos;s Talk
              </h3>
              <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                Whether you have a question about our services, want to discuss
                a project, or just want to say hello, our team is here to help.
              </p>
            </div>

            <div className="space-y-3">
              {/* Address */}
              <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-lg bg-white group">
                <CardContent className="pt-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">
                        Address
                      </h4>
                      <p className="text-slate-600">
                        123 Tech Street, Digital City, CA 94103
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-lg bg-white group">
                <CardContent className="pt-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">
                        Phone
                      </h4>
                      <p className="text-slate-600">+2349136600887</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-lg bg-white group">
                <CardContent className="pt-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">
                        Email
                      </h4>
                      <p className="text-slate-600">o.v.a.webvictech@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      Quick Response
                    </h4>
                    <p className="text-sm text-slate-600">
                      We typically respond to all inquiries within 24 hours
                      during business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div>
            <Card className="border-2 border-slate-200 shadow-xl bg-white">
              <CardContent className="pt-8 pb-8 px-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h3>

                {status === "sent" ? (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 text-lg mb-1">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-green-700">
                        Thanks — we received your message and will get back to
                        you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject
                      </label>
                      <input
                        required
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        placeholder="Tell us more about your project or inquiry..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white min-h-[140px] resize-none"
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {status === "sending" ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
