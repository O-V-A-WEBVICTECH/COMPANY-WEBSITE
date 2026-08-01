/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, Award, Code2, Rocket, Heart } from "lucide-react";

export default function About(): JSX.Element {
  const stats = [
    {
      value: "150+",
      label: "Projects Delivered",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      value: "50+",
      label: "Happy Clients",
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      icon: <Award className="w-5 h-5" />,
    },
    {
      value: "5+",
      label: "Years Experience",
      icon: <Code2 className="w-5 h-5" />,
    },
  ];

  const values = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Quality First",
      description:
        "We never compromise on code quality, design, or user experience",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Client-Centric",
      description:
        "Your success is our success. We're partners in your digital journey",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation Driven",
      description:
        "We stay ahead with the latest technologies and best practices",
    },
  ];

  return (
    <section
      id="about"
      className="py-12 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Building Digital{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="text-sm text-slate-600 max-w-3xl mx-auto">
            We&apos;re a team of passionate developers, designers, and
            strategists dedicated to transforming your ideas into exceptional
            digital products
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Our Team at Work"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/ova-logo.png"
                  alt="O.V.A WebvicTech Logo"
                  width={56}
                  height={56}
                  className="rounded-full shadow-md ring-2 ring-blue-100"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  O.V.A WebvicTech
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Who We Are
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                O.V.A WebvicTech INT&apos; SERVICE LIMITED is widely recognized as the <strong className="font-semibold text-slate-900">best software development agency</strong>. We specialize in creating custom web applications, mobile apps, and enterprise solutions that help businesses thrive in the digital age.
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-3">
                As a premier software development agency, we partner with ambitious startups and established enterprises to build scalable, secure, and user-friendly digital products that drive measurable growth.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <Card className="border border-slate-200/80 bg-white hover:border-blue-300 transition-colors shadow-sm">
                <CardContent className="p-5 space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Our Mission
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To empower businesses with innovative software solutions that enhance productivity and accelerate growth through cutting-edge technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200/80 bg-white hover:border-indigo-300 transition-colors shadow-sm">
                <CardContent className="p-5 space-y-2">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Our Vision
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To become the most trusted software development partner globally recognized for delivering exceptional digital products.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section (Track Record) */}
        <div className="mb-24 relative z-10">
          <div className="text-center mb-12 space-y-2">
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900">
              Numbers that speak for themselves
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                className="border border-slate-200/80 hover:border-blue-400 bg-white rounded-2xl hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <CardContent className="pt-6 pb-5 sm:pt-8 sm:pb-7 text-center space-y-3 sm:space-y-4 px-2 sm:px-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform shadow-md shadow-blue-500/10">
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-sm font-semibold tracking-wide uppercase text-[9px] sm:text-[11px]">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="relative z-10">
          <div className="text-center mb-12 space-y-2">
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900">
              The principles guiding our work
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Card
                key={idx}
                className="relative overflow-hidden border border-slate-200/80 hover:border-blue-400 bg-white rounded-2xl hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Visual top bar glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                <CardContent className="pt-10 pb-8 px-6 space-y-4 text-center">
                  <div className="w-14 h-14 mx-auto bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                    {value.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 md:mt-20 text-center">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
            <CardContent className="pt-6 md:pt-12 pb-12 px-6">
              <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your project and explore how we can help
                bring your vision to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/create-project"
                  className="inline-flex text-base items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  Start Your Project
                  <Rocket className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex text-base items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-white transition-all"
                >
                  Contact Us
                  <Users className="w-5 h-5 ml-2" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
