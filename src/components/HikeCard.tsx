import { Hike } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  hike: Hike;
};

export default function HikeCard({ hike }: Props) {
  return (
    <Pressable
      onPress={() => console.log(hike.name)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: hike.photoUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{hike.mountain}</Text>
        <Text style={styles.description}>{hike.distanceKm} km</Text>
        <Text style={styles.description}>{hike.difficulty}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, overflow: "hidden", backgroundColor: "#E6EEF7" },
  pressed: { opacity: 0.6 },
  image: { width: "100%", height: 200 },
  title: { fontSize: 14, color: "#666" },
  info: { padding: 16 },
  description: { fontSize: 14, color: "#666" },
});
