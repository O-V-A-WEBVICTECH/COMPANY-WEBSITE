/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { JSX } from "react";

export default function About(): JSX.Element {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">About O.V.A WebvicTech</h2>
          <p className="text-slate-600 mt-2">
            Learn more about our company, mission, and values
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              // width={800}
              // height={800}
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Our Office"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Who We Are</h3>
            <p className="text-slate-600 mb-4">
              O.V.A WebvicTech INT&apos; SERVICE LIMITED is a leading AI-powered
              web solutions company founded in 2018. We specialize in using
              advanced artificial intelligence to detect, fix, and create
              websites for businesses of all sizes.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-blue-600">
                  Our Mission
                </h4>
                <p className="text-slate-600">
                  To empower businesses with AI-driven web solutions that
                  enhance their online presence, improve user experience, and
                  drive growth.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600">
                  Our Vision
                </h4>
                <p className="text-slate-600">
                  To become the global leader in AI-powered web optimization and
                  creation, transforming how businesses approach their digital
                  presence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600">500+</div>
            <div className="text-slate-700">Clients Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">2,000+</div>
            <div className="text-slate-700">Websites Optimized</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">98%</div>
            <div className="text-slate-700">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
