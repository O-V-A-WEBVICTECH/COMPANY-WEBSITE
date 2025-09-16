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
            O.V.A WebvicTech INT' SERVICE LIMITED specializes in detecting and
            fixing web problems using advanced AI technology. We also help you
            create stunning websites with our{" "}
            <span className="font-semibold text-qwen">Qwen3-powered</span> AI
            solutions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#analysis"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow"
            >
              Analyze Your Website
            </a>
            <a
              href="#creation"
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
          <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg p-8 text-white shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Qwen3 AI Assistant</h3>
            <p className="mb-4">Advanced AI for web solutions</p>
            <i className="fas fa-brain text-6xl mb-4"></i>
            <p className="opacity-90">Powered by Alibaba Cloud's Qwen3</p>
          </div>
        </div>
      </div>
    </section>
  );
}
