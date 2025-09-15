function Process() {
  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            How We Work: AI Speed + Human Precision
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Step 1: Hunt
            </h3>
            <p className="text-gray-600">
              We scour the web for websites stuck in the past.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>Tools: SEMrush, Google Lighthouse, custom AI crawlers.</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Step 2: Build
            </h3>
            <p className="text-gray-600">
              AI drafts the solution. Humans make it perfect.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>GitHub Copilot + your team’s code review.</li>
              <li>Figma prototypes for client approval.</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Step 3: Deliver
            </h3>
            <p className="text-gray-600">
              We show you the problem—and the fix—before you ask.
            </p>
            <ul className="mt-4 text-gray-700 list-inside list-disc">
              <li>Live demo of your upgraded site.</li>
              <li>Zero upfront cost. Pay only if you love it.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Process;
