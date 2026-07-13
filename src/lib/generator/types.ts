export interface GeneratorOptions {
  framework: "nextjs" | "express" | "fastapi" | "go-templ" | "rails" | "laravel";
  auth: "jwt";
  database: "supabase";
  ui: "shadcn" | "tailwind" | "minimal";
  deployment: "vercel" | "railway" | "docker";
  projectName: string;
  githubToken: string;
  repoName: string;
}

export interface TemplateFile {
  path: string;
  content: string;
  binary?: boolean;
}

export interface GitHubRepoResult {
  repoUrl: string;
  cloneUrl: string;
  name: string;
}
