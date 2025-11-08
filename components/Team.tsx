/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX } from "react";
import { useState, useEffect } from "react";
import { TeamMember } from "@/app/admin-dashboard/page";
import axios from "axios";

export default function Team(): JSX.Element {
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  async function getTeams() {
    try {
      setLoading(true);
      const response = await axios.get<TeamMember[]>("/api/users/get-team");
      if (response.status === 200) setTeamMembers(response.data);
      return setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

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
          {teamMembers?.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={`${m?.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <div className="text-qwen font-medium mb-2">{m?.about}</div>
                <p className="text-slate-600 text-sm">{m.position}&apos;</p>
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
