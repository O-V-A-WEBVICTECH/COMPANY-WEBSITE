import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../blogData.js";

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Return to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <section className="bg-white py-20 text-center shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {post.title}
          </h1>
          <p className="text-sm italic text-gray-500 mt-4">
            Published on {post.date}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl prose">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link
            to="/blog"
            className="text-blue-600 font-semibold hover:underline mt-12 block"
          >
            ← Back to all posts
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BlogPost;
