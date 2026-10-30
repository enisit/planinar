import HikeCard from "@/components/HikeCard";
import { hikes } from "@/data/hikes";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {hikes.map((hike) => (
        <HikeCard key={hike.id} hike={hike} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 150,
  },
});
