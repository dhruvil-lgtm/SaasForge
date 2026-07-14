"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Clock, Flame } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  project_name: string;
  stack: string;
  github_repo_url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      fetchProjects();
    });
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-white/5 rounded" />
          <div className="h-4 w-64 bg-white/5 rounded" />
          <div className="grid gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-30" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-white/40 mt-1 lowercase">
            welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </p>
        </div>
        <Link href="/generate">
          <button className="inline-flex items-center gap-2 bg-white text-black text-sm rounded-full py-3 px-6 font-normal hover:bg-neutral-200 transition-all duration-300">
            <Plus className="h-4 w-4" />
            new project
          </button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] mb-5">
              <Flame className="h-6 w-6 text-white/30" />
            </div>
            <h2 className="text-xl font-medium text-white/70 mb-2">Nothing here yet</h2>
            <p className="text-sm text-white/40 mb-6 max-w-sm">
              Generate your first boilerplate and it will show up here.
            </p>
            <Link href="/generate">
              <button className="inline-flex items-center gap-2 bg-white text-black text-sm rounded-full py-3 px-6 font-normal hover:bg-neutral-200 transition-all duration-300">
                <Plus className="h-4 w-4" />
                generate your first saas
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 relative">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-white/[0.06] bg-neutral-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/[0.1] transition-all duration-300">
              <div>
                <h3 className="font-medium text-white/80">{project.project_name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-0.5 text-xs text-white/50">{project.stack}</span>
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Clock className="h-3 w-3" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a href={project.github_repo_url} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 border border-white/20 text-white/60 text-sm rounded-full py-2.5 px-5 hover:bg-white/10 hover:text-white transition-all duration-300">
                  <ExternalLink className="h-4 w-4" />
                  view repo
                </button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
