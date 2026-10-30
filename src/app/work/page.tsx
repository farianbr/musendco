import type { Metadata } from "next";
import { disciplines, projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Musendco across branding, packaging, print, illustration, social campaigns and retouching.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
};

export default function WorkPage() {
  return (
    <PageTransition>
      <PageHeader
        title={[{ text: "Work, from first idea" }, { text: "to launch.", em: true }]}
        intro="Websites, branding, packaging, print, illustration and campaign work. Filter by discipline, or open any project."
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
