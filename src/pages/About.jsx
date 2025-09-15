import { teamMembers } from "../teamData.js";

function About() {
  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            We’re Not Just Coders. We’re Problem-Solving Detectives.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Founder’s Story
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hi, I’m Victor Olaiya—a student at The Polytechnic Ibadan and the
              CEO of O.V.A.WebvicTech. I started this company because I saw
              businesses losing money to invisible web issues. Our mission? Fix
              problems before they’re found. No hype. No spam. Just solutions
              that speak for themselves.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Meet the Squad
            </h3>
            <p className="text-gray-600 mb-8">
              Developers, designers, and AI whisperers united by one goal: your
              success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  className="bg-gray-50 p-6 rounded-lg shadow-sm text-center transition-transform duration-300 ease-in-out hover:scale-105"
                  key={index}
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm italic text-gray-500">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Mission Statement
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower SMEs with proactive web solutions—because prevention
              beats damage control.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
