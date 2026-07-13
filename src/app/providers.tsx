"use client";

import { ThemeProvider } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
