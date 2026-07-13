import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo,user",
    },
  });

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.json({ error: "Failed to start GitHub OAuth" }, { status: 500 });
}
