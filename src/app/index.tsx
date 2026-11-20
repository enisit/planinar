import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import FilterChip from "@/components/FilterChip";
import HikeCard from "@/components/HikeCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { fetchHikes } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { Difficulty, Hike } from "@/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const difficultyRank: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

type Status = "loading" | "error" | "ready";
type Filter = "all" | Difficulty;
type Sort = "newest" | "longest";

const FILTERS: Filter[] = ["all", "easy", "medium", "hard"];
const SORTS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "longest", label: "Longest" },
];

export default function Index() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<Status>("loading");
  const [hikes, setHikes] = useState<Hike[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const data = await fetchHikes();
        if (!ignore) {
          setHikes(data);
          setStatus("ready");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [attempt]);

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns,
  );

  const filtered =
    filter === "all"
      ? hikes
      : hikes.filter((hike) => hike.difficulty === filter);

  const visible =
    sort === "newest"
      ? [...filtered].sort((a, b) => b.date.localeCompare(a.date))
      : sort === "longest"
        ? [...filtered].sort((a, b) => b.distanceKm - a.distanceKm)
        : filtered;

  const totalKm = visible.reduce((sum, hike) => sum + hike.distanceKm, 0);
  const maxDifficulty = visible.reduce<Difficulty | null>(
    (max, hike) =>
      max === null || difficultyRank[hike.difficulty] > difficultyRank[max]
        ? hike.difficulty
        : max,
    null,
  );

  const summary = [
    { value: String(visible.length), label: "hikes" },
    { value: totalKm.toFixed(1), label: "km" },
    { value: maxDifficulty ?? "–", label: "max" },
  ];

  function confirmDelete(hike: Hike) {
    Alert.alert("Delete hike?", `"${hike.name}" will be removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setHikes((list) => list.filter((h) => h.id !== hike.id)),
      },
    ]);
  }

  function retry() {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      const data = await fetchHikes();
      setHikes(data);
    } catch {
      setStatus("error");
    } finally {
      setRefreshing(false);
    }
  }

  if (status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return <ErrorState message="Could not load hikes" onRetry={retry} />;
  }

  return (
    <FlatList
      key={columns}
      numColumns={columns}
      data={visible}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HikeCard
          hike={item}
          style={{ width: cardWidth }}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      onRefresh={refresh}
      refreshing={refreshing}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      ListHeaderComponent={
        <View>
          <SummaryRow items={summary} />
          <View style={styles.chips}>
            {FILTERS.map((value) => (
              <FilterChip
                key={value}
                label={value === "all" ? "All" : value}
                selected={value === filter}
                onPress={() => setFilter(value)}
              />
            ))}
            {SORTS.map(({ value, label }) => (
              <FilterChip
                key={value}
                label={label}
                selected={value === sort}
                onPress={() => setSort(sort === value ? null : value)}
              />
            ))}
          </View>
        </View>
      }
      ListHeaderComponentStyle={styles.header}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
      ListEmptyComponent={
        filter === "all" ? (
          <EmptyState
            title="No hikes yet"
            message="Your hikes will appear here."
          />
        ) : (
          <EmptyState
            title={`No ${filter} hikes`}
            message="Choose another difficulty."
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { padding: Spacing.md, flexGrow: 1 },
  header: { marginBottom: Spacing.md },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  separator: { height: Spacing.md },
  columnWrapper: { gap: Spacing.md },
});
