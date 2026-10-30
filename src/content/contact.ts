import { services } from "./services";

/** Options for the inquiry form. Shared by the form UI and server validation. */
export const projectTypes = [...services.map((s) => s.name), "Something else"];

/** UNCONFIRMED ranges and currency. Confirm with Musendco or remove the field. */
export const budgetRanges = [
  "Under $10k",
  "$10k to $25k",
  "$25k to $50k",
  "$50k and above",
  "Not sure yet",
];
