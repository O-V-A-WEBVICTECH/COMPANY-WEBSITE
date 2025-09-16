export default function Careers(): JSX.Element {
  return (
    <section id="careers" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Join Our Team</h2>
          <p className="text-slate-600 mt-2">
            Help us revolutionize web development with AI-powered solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl text-blue-600 mb-2">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="font-semibold mb-2">Health & Wellness</h3>
            <p className="text-slate-600">
              Comprehensive health insurance, mental health support, and
              wellness programs
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl text-blue-600 mb-2">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="font-semibold mb-2">Professional Growth</h3>
            <p className="text-slate-600">
              Continuous learning opportunities, conferences, and career
              development
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Current Openings</h3>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold">Senior AI Engineer</h4>
                  <div className="text-sm text-slate-500">
                    Full-time · Remote
                  </div>
                </div>
                <a className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Apply Now
                </a>
              </div>
              <p className="mt-3 text-slate-600">
                We're looking for an experienced AI engineer to help us enhance
                our Qwen3-powered solutions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold">Frontend Developer</h4>
                  <div className="text-sm text-slate-500">
                    Full-time · Hybrid
                  </div>
                </div>
                <a className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Apply Now
                </a>
              </div>
              <p className="mt-3 text-slate-600">
                Join our development team to build intuitive, responsive
                interfaces. Experience with React required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
