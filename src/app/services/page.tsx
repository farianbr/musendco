import type { Metadata } from "next";
import { disciplines, projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Muse services: branding, SaaS and websites, packaging, social media and thumbnails, and illustration, each shown through real projects.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function WorkPage() {
  return (
    <PageTransition>
      <PageHeader
        title={[{ text: "Services, shown through" }, { text: "the work.", em: true }]}
        intro="Five services, fifteen projects we stand behind. Pick a service to see what it looks like in practice, or open any project."
      />
      <section aria-label="Projects" className="shell pb-(--space-section)">
        <div className="enter-fade" style={{ "--delay": "500ms" } as React.CSSProperties}>
          <WorkGrid projects={projects} disciplines={disciplines} />
        </div>
      </section>
      <ClosingCta />
    </PageTransition>
  );
}
