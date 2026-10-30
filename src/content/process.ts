import type { ProcessStage } from "@/types/content";

/** DEMO workflow. Replace with Musendco's real process. */
export const processStages: ProcessStage[] = [
  {
    name: "Discovery",
    description: "Interviews, research and a close read of what exists, so the problem is agreed before anything is designed.",
    outcome: "A shared brief and success criteria",
    duration: "1 to 2 weeks",
  },
  {
    name: "Direction",
    description: "Two or three creative routes, tested against the brief. We choose one together and plan the build.",
    outcome: "An agreed direction and plan",
    duration: "2 weeks",
  },
  {
    name: "Design and build",
    description: "Systems, screens, pages and assets, made and reviewed in short weekly cycles.",
    outcome: "Working design and code",
    duration: "4 to 10 weeks",
  },
  {
    name: "Refine",
    description: "Detailed review across devices with real content. Small decisions get the same care as large ones.",
    outcome: "Production-ready work",
    duration: "1 to 2 weeks",
  },
  {
    name: "Launch",
    description: "A calm launch, documentation for your team and support while the work settles in.",
    outcome: "A launched project and handover",
    duration: "Ongoing",
  },
];
