function Solutions() {
  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            We Don’t Wait for Problems to Knock. We Solve Them First.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Proactive Website Audits
            </h3>
            <p className="text-gray-600">
              Your website is losing customers. We’ll find out why—before you
              do.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>AI-powered scans for speed, SEO, mobile-friendliness.</li>
              <li>Free report with actionable fixes.</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              AI-Driven Redesigns
            </h3>
            <p className="text-gray-600">
              From outdated to outstanding. No coding required.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>AI-generated prototypes tailored to your brand.</li>
              <li>Human-polished UI/UX for effortless navigation.</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Ongoing Maintenance
            </h3>
            <p className="text-gray-600">
              Sleep easy. We’ll keep your site fast, secure, and ahead of the
              curve.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>Monthly performance checkups.</li>
              <li>Instant emergency fixes.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Why wait for disaster? Let’s prevent it.
          </h2>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block"
          >
            Get Your Free Audit Now →
          </a>
        </div>
      </section>
    </div>
  );
}

export default Solutions;
