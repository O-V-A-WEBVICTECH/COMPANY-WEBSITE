import { JSX } from "react";
import Image from "next/image";

export default function Hero(): JSX.Element {
  return (
    <section
      id="home"
      className="pt-28 pb-20 bg-gradient-to-br from-sky-50 to-sky-100"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            AI-Powered <span className="text-blue-600">Web Solutions</span> for
            Your Business
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            O.V.A WebvicTech INT&apos; SERVICE LIMITED specializes in detecting
            and fixing web problems using advanced AI technology. we fix problem
            before you know they exist
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#analysis"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow"
            >
              Analyze Your Website
            </a>
            <a
              href="/comming-soon"
              className="inline-block border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Create Website
            </a>
          </div>

          <div className="mt-6 inline-flex items-center bg-qwen text-white px-4 py-2 rounded-full font-semibold">
            <i className="fas fa-microchip mr-3"></i> Powered by Qwen3 AI
          </div>
        </div>

        <div className="md:w-1/2">
          <div>
            <Image
              width={500}
              quality={100}
              height={500}
              alt="company logo"
              src={"/ovi-logo.png"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
