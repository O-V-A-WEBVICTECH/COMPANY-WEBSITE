import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedScanResult = localStorage.getItem("lastScanResult");
    if (storedScanResult) {
      const { url, result } = JSON.parse(storedScanResult);
      setWebsiteUrl(url);

      // const description = Scan Report for ${url}:\n\n
      //   + Performance Score: ${result.performance.score}/100\n
      //   + Diagnosis: ${result.performance.diagnosis}\n\n
      //   + SEO Score: ${result.seo.score}/100\n
      //   + Diagnosis: ${result.seo.diagnosis}\n\n
      //   + Mobile Friendliness: ${result.mobile.score}/100\n
      //   + Diagnosis: ${result.mobile.diagnosis}\n\n
      //   + I'd like to get a free demo to fix these issues.;

      setProblemDescription(description);

      localStorage.removeItem("lastScanResult");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Spot a Broken Website? Let’s Fix It.
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            (Yes, Even if It’s Not Yours.)
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <form
            className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto flex flex-col gap-4"
            action="YOUR_FORMSPREE_URL_HERE"
            method="POST"
          >
            <label htmlFor="name" className="font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="_replyto"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="url" className="font-semibold text-gray-700">
              Website URL (Optional)
            </label>
            <input
              type="url"
              id="url"
              name="website_url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="problem" className="font-semibold text-gray-700">
              Describe the problem (or let us find it!)
            </label>
            <textarea
              id="problem"
              name="problem_description"
              rows="5"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors self-end mt-4"
            >
              Send Request →
            </button>
          </form>
        </div>
      </section>

      <section className="py-12 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <p className="mb-2">Prefer WhatsApp? Chat us at [+234 XXX XXXX]</p>
          <p className="mb-4">Follow the hustle: [Social Media Icons]</p>
          <p className="italic text-sm text-gray-500">
            P.S. We never cold-call. We solve first. Always.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
