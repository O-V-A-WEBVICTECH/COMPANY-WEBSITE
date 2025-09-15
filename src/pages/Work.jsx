import { caseStudies } from "../data.js";
import { testimonials } from "../testimonialsData.js";
import TestimonialCard from "../components/TestimonialCard.jsx";

function Work() {
  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            We Solved These Problems Before They Became Emergencies.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {caseStudies.map((study, index) => (
            <div
              className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
              key={index}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {study.title}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Problem:</strong> {study.problem}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Solution:</strong> {study.solution}
              </p>
              <p className="text-gray-600">
                <strong>Result:</strong> {study.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-200 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                title={testimonial.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-800 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Your turn. Let’s turn your site from liability to asset.
          </h2>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block"
          >
            Request a Free Demo 🚀
          </a>
        </div>
      </section>
    </div>
  );
}

export default Work;
