// Shell for simple pages (balances, legal): nav + main + footer, without home-page motion effects.
import type { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { IconSprite } from "@/components/common/ui";

/** Wraps simple pages with the shared nav and footer. */
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
