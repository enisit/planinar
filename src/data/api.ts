import type { Hike } from "@/types";
import { hikes } from "./hikes";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fake server: waits 800 ms, then returns the sample hikes (or fails on request)
export async function fetchHikes(
  options: { fail?: boolean } = {},
): Promise<Hike[]> {
  await wait(800);
  if (options.fail) throw new Error("Could not load hikes");
  return hikes;
}
