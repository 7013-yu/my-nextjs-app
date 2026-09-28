import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStepCount } from "@/hooks/useStepCount";

interface UserInfo {
  user_id: string;
  username: string;
  name: string | null;
}

export default function HomeScreen() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { isAvailable, todaySteps, liveSteps } = useStepCount();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("user").then((stored) => {
        setUser(stored ? JSON.parse(stored) : null);
      });
    }, [])
  );

  const displayName = user?.name || "使用者";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>你好,{displayName} 👋</Text>

      <Text style={styles.sectionTitle}>今日提醒</Text>

      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>還沒有任何用藥提醒</Text>
        <Text style={styles.emptySubtitle}>點右下角的「+」新增一筆吧</Text>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // TODO: 導向新增提醒頁面
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1ea",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  stepLabel: {
    color: "#666",
    marginBottom: 6,
  },
  stepValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3f2e5e",
  },
  stepUnavailable: {
    color: "#999",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyTitle: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: "#999",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f0a63a",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
});