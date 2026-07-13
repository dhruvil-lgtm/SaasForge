"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <SiteHeader />}
      <main className="flex-1">{children}</main>
    </>
  );
}
