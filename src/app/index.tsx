import HikeCard from "@/components/HikeCard";
import HikeDetails from "@/components/HikeDetails";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { hikes } from "@/data/hikes";
import { Difficulty } from "@/types";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const difficultyRank: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function Index() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns,
  );

  const totalKm = hikes.reduce((sum, hike) => sum + hike.distanceKm, 0);
  const maxDifficulty = hikes.reduce<Difficulty | null>(
    (max, hike) =>
      max === null || difficultyRank[hike.difficulty] > difficultyRank[max]
        ? hike.difficulty
        : max,
    null,
  );

  const summary = [
    { value: String(hikes.length), label: "hikes" },
    { value: totalKm.toFixed(1), label: "km" },
    { value: maxDifficulty ?? "–", label: "max" },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <SummaryRow items={summary} />

      <View style={styles.grid}>
        {hikes.map((hike) => (
          <HikeCard key={hike.id} hike={hike} style={{ width: cardWidth }} />
        ))}
      </View>

      {/* Temporary: preview of the details component until the details screen exists */}
      <HikeDetails hike={hikes[0]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.md },
});
