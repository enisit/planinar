import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

type SummaryItem = {
  value: string;
  label: string;
};

type Props = {
  items: SummaryItem[];
};

export default function SummaryRow({ items }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.value, { color: theme.primary }]}>
            {item.value}
          </Text>
          <Text style={[styles.label, { color: theme.muted }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: Spacing.sm },
  box: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  value: { fontSize: FontSize.hero, fontWeight: "700" },
  label: { fontSize: FontSize.small },
});
