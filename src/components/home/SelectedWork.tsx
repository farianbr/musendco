import { home } from "@/content/home";
import { featuredProjects } from "@/content/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitWords } from "@/components/ui/SplitWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WorkStack } from "./WorkStack";

export function SelectedWork() {
  const { eyebrow, lead, emphasis } = home.work;

  return (
    <section id="work" aria-labelledby="work-heading" className="shell pt-(--space-section)">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id="work-heading" data-reveal="words" className="mt-4 max-w-[18ch] text-title font-medium">
        <SplitWords parts={[{ text: lead }, { text: emphasis, em: true }]} />
      </h2>

      <div className="mt-(--space-block)">
        <WorkStack projects={featuredProjects} />
      </div>

      <div className="flex justify-center pt-8" data-reveal="fade">
        <ButtonLink href="/work" variant="secondary" arrow>
          See all projects
        </ButtonLink>
      </div>
    </section>
  );
}
