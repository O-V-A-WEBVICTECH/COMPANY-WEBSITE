import WebsiteScanner from "../components/WebsiteScanner.jsx";

function Home() {
  return (
    <div className="home-page">
      <WebsiteScanner />

      <section className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Our Proactive Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                1. Detect
              </h3>
              <p className="text-gray-600">
                We scan the web for sites with slow load times, poor SEO, or
                outdated designs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                2. Build
              </h3>
              <p className="text-gray-600">
                Our AI crafts solutions; our team refines them into seamless,
                modern fixes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                3. Deliver
              </h3>
              <p className="text-gray-600">
                We show you the problem and the fix. No pressure. Just proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 italic text-xl">
            "Trusted by 50+ SMEs across Nigeria"
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
