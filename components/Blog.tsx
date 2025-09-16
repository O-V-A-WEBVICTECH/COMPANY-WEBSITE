import { JSX } from "react";

export default function Blog(): JSX.Element {
  const posts = [
    {
      title: "How Qwen3 is Revolutionizing Web Development",
      date: "June 15, 2023",
      img: "https://images.unsplash.com/photo-1677442135722-5f6d0318b274",
    },
    {
      title: "5 Common Website Issues and How to Fix Them",
      date: "May 28, 2023",
      img: "https://images.unsplash.com/photo-1677442135133-34347a4666b5",
    },
    {
      title: "The Future of AI in Web Design and Development",
      date: "April 12, 2023",
      img: "https://images.unsplash.com/photo-1677442135529-248364799478",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
          <p className="text-slate-600 mt-2">
            Insights, tips, and news about AI, web development, and digital
            transformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article
              key={i}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`${p.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-sm text-slate-500 mb-2">{p.date}</div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-slate-600 mb-3">
                  Short excerpt that invites the reader to learn more about AI
                  and web development.
                </p>
                <a href="#" className="text-blue-600 font-semibold">
                  Read More <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
