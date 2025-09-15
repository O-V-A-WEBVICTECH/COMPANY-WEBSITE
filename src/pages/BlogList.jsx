import { Link } from "react-router-dom";
import { blogPosts } from "../blogData.js";

function BlogList() {
  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Insights & Solutions: The O.V.A.WebvicTech Blog
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                key={post.id}
              >
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-2xl font-bold text-blue-600 hover:underline mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm italic text-gray-500 mb-4">
                  Published on {post.date}
                </p>
                <p className="text-gray-600">{post.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogList;
