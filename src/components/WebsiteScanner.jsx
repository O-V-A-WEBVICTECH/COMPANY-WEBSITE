import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WebsiteScanner = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setScanResult(null);

    setTimeout(() => {
      setIsLoading(false);

      const simulatedResult = {
        performance: {
          score: 45,
          diagnosis:
            "Slow loading images and unoptimized code are hurting your user experience.",
        },
        seo: {
          score: 60,
          diagnosis:
            "Missing meta descriptions and a poor keyword strategy are limiting your visibility.",
        },
        mobile: {
          score: 90,
          diagnosis:
            "Your site is mostly mobile-friendly, but a few small layout issues exist.",
        },
      };
      setScanResult(simulatedResult);

      localStorage.setItem(
        "lastScanResult",
        JSON.stringify({ url, result: simulatedResult })
      );
    }, 3000);
  };

  const handleFixIssuesClick = () => {
    navigate("/contact");
  };

  return (
    <section className="bg-white py-24 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          We Fix Web Problems Before You Know They Exist.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600">
          Stop losing customers to slow, outdated websites. Let our AI-powered
          audits detect issues—then we solve them. Proactively. No spam. Just
          results.
        </p>

        <form
          onSubmit={handleScan}
          className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto"
        >
          <input
            type="text"
            placeholder="Enter your website URL (e.g., www.example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-grow w-full md:w-auto p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Scanning..." : "Scan My Site for Free →"}
          </button>
        </form>

        {isLoading && (
          <div className="mt-8">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {scanResult && (
          <div className="mt-12 bg-gray-50 p-8 rounded-xl shadow-lg animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Scan Report for {url}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">
                  Performance: {scanResult.performance.score}/100
                </h4>
                <p className="text-gray-600 mt-2">
                  {scanResult.performance.diagnosis}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">
                  SEO: {scanResult.seo.score}/100
                </h4>
                <p className="text-gray-600 mt-2">{scanResult.seo.diagnosis}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">
                  Mobile Friendliness: {scanResult.mobile.score}/100
                </h4>
                <p className="text-gray-600 mt-2">
                  {scanResult.mobile.diagnosis}
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-gray-700">
              Want to fix these issues?
              <button
                onClick={handleFixIssuesClick}
                className="text-blue-600 font-bold ml-1 hover:underline"
              >
                Get a free demo.
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebsiteScanner;
