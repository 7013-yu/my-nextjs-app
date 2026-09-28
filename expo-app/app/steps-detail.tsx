import { View, Text, FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useStepHistory } from "@/hooks/useStepHistory";
import { WeeklyStepsChart } from "@/components/WeeklyStepsChart";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date().toISOString().slice(0, 10);
  const label = `${d.getMonth() + 1}/${d.getDate()}`;
  return dateStr === today ? `${label}(今天)` : label;
}

export default function StepsDetailScreen() {
  const { history, loading } = useStepHistory();

  // 取最近7天(history本身是舊到新排序,取最後7筆)
  const last7Days = history.slice(-7);

  // 列表由新到舊
  const sortedList = [...history].reverse();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "步數紀錄" }} />

      {loading ? (
        <Text style={styles.loadingText}>載入中...</Text>
      ) : (
        <FlatList
          data={sortedList}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.chartCard}>
              <WeeklyStepsChart data={last7Days} />
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Text style={item.steps > 0 ? styles.steps : styles.stepsEmpty}>
                {item.steps > 0 ? `${item.steps} 步` : "無資料"}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1ea",
  },
  loadingText: {
    color: "#999",
    textAlign: "center",
    marginTop: 40,
  },
  listContent: {
    padding: 20,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  date: {
    fontSize: 15,
    color: "#333",
  },
  steps: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  stepsEmpty: {
    fontSize: 14,
    color: "#bbb",
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e0d5",
  },
});