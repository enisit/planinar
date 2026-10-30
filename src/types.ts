export type Difficulty = "easy" | "medium" | "hard";

export type Hike = {
  id: string;
  name: string;
  mountain: string;
  date: string;
  distanceKm: number;
  difficulty: Difficulty;
  photoUrl: string;
  notes?: string;
};
