import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Hike } from "@/types";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  hike: Hike;
};

export default function HikeDetails({ hike }: Props) {
  const theme = useTheme();
  const rows: [string, string][] = [
    ["Mountain", hike.mountain],
    ["Date", hike.date],
    ["Distance", `${hike.distanceKm} km`],
    ["Difficulty", hike.difficulty],
  ];
  if (hike.notes) rows.push(["Notes", hike.notes]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: hike.photoUrl }} style={styles.photo} />
      <Text style={[styles.title, { color: theme.text }]}>{hike.name}</Text>
      {rows.map(([label, value]) => (
        <View
          key={label}
          style={[styles.row, { borderBottomColor: theme.border }]}
        >
          <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: Spacing.sm,
  },
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: "700", marginTop: Spacing.sm },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: FontSize.body },
  value: { fontSize: FontSize.body, flexShrink: 1, textAlign: "right" },
});
