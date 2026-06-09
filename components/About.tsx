/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
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
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Our Team at Work"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/90 rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  {/* <div>
                    <div className="font-bold text-slate-900 text-lg">
                      15+ Developers
                    </div>
                    <div className="text-sm text-slate-600">
                      Experienced Team
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Who We Are
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                O.V.A WebvicTech INT&apos; SERVICE LIMITED is a full-service
                software development agency. We specialize in creating custom
                web applications, mobile apps, and enterprise solutions that
                help businesses thrive in the digital age.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                From startups to established enterprises, we partner with
                organizations to build scalable, secure, and user-friendly
                digital products that drive real business results.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-transparent hover:border-blue-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        Our Mission
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        To empower businesses with innovative software solutions
                        that enhance productivity, improve user experiences, and
                        accelerate growth through cutting-edge technology.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-transparent hover:border-indigo-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <Eye className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        Our Vision
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        To become the most trusted software development partner,
                        recognized globally for delivering exceptional digital
                        products that transform businesses and delight users.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            Our Track Record
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                className="border-2 hover:border-blue-300 transition-all hover:shadow-lg group"
              >
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4">
              Our Core Values
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Card
                key={idx}
                className="border-2 hover:border-blue-300 transition-all hover:shadow-xl group"
              >
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
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
