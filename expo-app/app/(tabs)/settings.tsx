import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  user_id: string;
  username: string;
  name: string | null;
  phone: string | null;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [checked, setChecked] = useState(false);

  // 每次切到設定分頁都重新確認登入狀態(登入/登出完回來要更新畫面)
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("user").then((stored) => {
        setUser(stored ? JSON.parse(stored) : null);
        setChecked(true);
      });
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  if (!checked) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>

      {user ? (
        // 已登入畫面
        <View style={styles.card}>
          <Text style={styles.cardLabel}>目前登入帳號</Text>
          <Text style={styles.userName}>{user.name || user.username}</Text>
          <Text style={styles.userSub}>帳號:{user.username}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>登出</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 未登入畫面
        <View style={styles.card}>
          <Text style={styles.cardLabel}>你還沒有登入</Text>
          <Text style={styles.cardSub}>
            登入後才能記錄你的服藥資料
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.loginButtonText}>登入 / 註冊</Text>
          </TouchableOpacity>
        </View>
      )}
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
  cardLabel: {
    color: "#666",
    marginBottom: 4,
  },
  cardSub: {
    color: "#999",
    fontSize: 13,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  userSub: {
    color: "#999",
    fontSize: 13,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#3f2e5e",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#e5473d",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});