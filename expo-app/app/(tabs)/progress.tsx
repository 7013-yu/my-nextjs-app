import { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useStepHistory } from "@/hooks/useStepHistory";
import { StepsBarChart } from "@/components/StepsBarChart";

export default function ProgressScreen() {
  const router = useRouter();
  const { history, todaySteps, averageSteps, loading, refresh } =
    useStepHistory();

  // 每次切到這個分頁都重新整理一次(順便把今天最新步數存進歷史)
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>進展</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => router.push("/steps-detail")}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>步數</Text>
          <Text style={styles.cardSubtitle}>過去30天</Text>
          <Text style={styles.chevron}>›</Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>載入中...</Text>
        ) : (
          <>
            <StepsBarChart data={history} />

            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>今天</Text>
                <Text style={styles.statValue}>{todaySteps}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>平均</Text>
                <Text style={styles.statValue}>{averageSteps}</Text>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1ea",
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#999",
    flex: 1,
  },
  chevron: {
    fontSize: 20,
    color: "#bbb",
  },
  loadingText: {
    color: "#999",
    paddingVertical: 20,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 32,
  },
  statBlock: {},
  statLabel: {
    color: "#999",
    fontSize: 13,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  note: {
    marginTop: 20,
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
});