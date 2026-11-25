import { cacheLife } from "next/cache";
import { projects } from "@/content/projects";

/**
 * The current calendar year. Cached for a day, so prerendered pages pick up a
 * new year on their own (within a day of 1 January) without a redeploy.
 */
export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * The studio's record, counted from the projects on the site and today's date:
 * the first year with published work, every year from then to now, and the
 * running total of projects at the end of each year.
 */
export async function getRecord() {
  const projectYears = projects.map((p) => p.year);
  const firstYear = Math.min(...projectYears);
  const lastYear = Math.max(await getCurrentYear(), ...projectYears);

  let total = 0;
  const growth = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
    const year = firstYear + i;
    total += projectYears.filter((y) => y === year).length;
    return { year, total };
  });

  return { firstYear, lastYear, yearsOnRecord: growth.length, growth };
}
