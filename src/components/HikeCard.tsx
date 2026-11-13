import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Hike } from "@/types";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  hike: Hike;
  style?: StyleProp<ViewStyle>;
};

export default function HikeCard({ hike, style }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => console.log(hike.name)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image source={{ uri: hike.photoUrl }} style={styles.photo} />
        <Text
          style={[
            styles.badge,
            { backgroundColor: theme.primary, color: theme.onPrimary },
          ]}
        >
          {hike.difficulty}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{hike.name}</Text>
        <Text style={[styles.description, { color: theme.muted }]}>
          {hike.mountain} · {hike.distanceKm} km · {hike.date}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  pressed: { opacity: 0.6 },
  photo: { width: "100%", aspectRatio: 16 / 9 },
  badge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    overflow: "hidden",
    fontSize: FontSize.small,
    fontWeight: "700",
  },
  info: { padding: Spacing.md, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: "700" },
  description: { fontSize: FontSize.small },
});
