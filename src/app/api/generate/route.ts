import { NextRequest, NextResponse } from "next/server";
import { generateBoilerplate } from "@/lib/generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { framework, auth, database, ui, deployment, projectName, repoName, githubToken } = body;

    if (!framework || !githubToken || !repoName) {
      return NextResponse.json(
        { error: "Missing required fields: framework, githubToken, repoName" },
        { status: 400 },
      );
    }

    const validFrameworks = ["nextjs", "express", "fastapi", "go-templ", "rails", "laravel"];
    if (!validFrameworks.includes(framework)) {
      return NextResponse.json(
        { error: `Invalid framework. Must be one of: ${validFrameworks.join(", ")}` },
        { status: 400 },
      );
    }

    const result = await generateBoilerplate({
      framework,
      auth: auth || "jwt",
      database: database || "supabase",
      ui: ui || "shadcn",
      deployment: deployment || "vercel",
      projectName: projectName || repoName,
      repoName,
      githubToken,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Generation failed:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 },
    );
  }
}
