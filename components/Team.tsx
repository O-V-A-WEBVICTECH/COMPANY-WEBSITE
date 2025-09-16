export default function Team(): JSX.Element {
  const members = [
    {
      name: "Sarah Johnson",
      title: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
    {
      name: "Michael Chen",
      title: "CTO",
      img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
    },
    {
      name: "Emma Rodriguez",
      title: "Lead Designer",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "David Kim",
      title: "Senior Developer",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ];

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-slate-600 mt-2">
            Our talented team of AI experts, developers, and designers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-56 overflow-hidden">
                <img
                  src={`${m.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <div className="text-qwen font-medium mb-2">{m.title}</div>
                <p className="text-slate-600 text-sm">
                  Short bio text describing {m.name}'s role and background.
                </p>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <a className="text-slate-600 hover:text-blue-600">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-slate-600 hover:text-blue-600">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-slate-600 hover:text-blue-600">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
