import Handlebars from "handlebars";
import type { GeneratorOptions } from "./types";

export function renderTemplate(
  templateContent: string,
  options: Partial<GeneratorOptions>,
): string {
  const compiled = Handlebars.compile(templateContent);
  return compiled({
    projectName: options.projectName || "my-saas-app",
    repoName: options.repoName || "my-saas-app",
    framework: options.framework || "nextjs",
    auth: options.auth || "jwt",
    database: options.database || "supabase",
    ui: options.ui || "shadcn",
    deployment: options.deployment || "vercel",
    year: new Date().getFullYear(),
  });
}
