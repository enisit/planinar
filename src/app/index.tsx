import HikeCard from "@/components/HikeCard";
import HikeDetails from "@/components/HikeDetails";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { hikes } from "@/data/hikes";
import { useTheme } from "@/hooks/use-theme";
import { Difficulty } from "@/types";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const difficultyRank: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function Index() {
  const theme = useTheme();
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
      <View style={styles.summaryRow}>
        {summary.map((item) => (
          <View
            key={item.label}
            style={[
              styles.summaryBox,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.summaryValue, { color: theme.primary }]}>
              {item.value}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.muted }]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

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
  summaryRow: { flexDirection: "row", gap: Spacing.sm },
  summaryBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  summaryValue: { fontSize: FontSize.hero, fontWeight: "700" },
  summaryLabel: { fontSize: FontSize.small },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.md },
});
