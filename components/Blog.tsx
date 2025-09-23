"use client";
/* eslint-disable @next/next/no-img-element */
import { BlogPosts } from "@/app/dashboard/page";
import axios from "axios";
import { JSX, useEffect, useState } from "react";

export default function Blog(): JSX.Element {
  const [posts, setPost] = useState<BlogPosts[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  async function getTeams() {
    try {
      setLoading(true);
      const response = await axios.get<BlogPosts[]>("/api/posts/");
      if (response.status === 200) setPost(response.data);
      return setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

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
          {posts?.map((p, i) => (
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
