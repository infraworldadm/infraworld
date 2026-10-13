import type { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { IconSprite } from "@/components/site/ui";

export function SubPage({ children }: { children: ReactNode }) {
  return (
    <>
      <IconSprite />
      <Navigation />
      <main className="subpage wrap">{children}</main>
      <Footer />
    </>
  );
}
