import { LayoutClient } from "@/components/layout-client";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutClient>{children}</LayoutClient>
      <SiteFooter />
    </>
  );
}
