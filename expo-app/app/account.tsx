import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  user_id: string;
  username: string;
  name: string | null;
}

function showNotAvailable(feature: string) {
  Alert.alert(feature, "此功能還在開發中,敬請期待。");
}

export default function AccountScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("user").then((stored) => {
        try {
          setUser(stored ? JSON.parse(stored) : null);
        } catch {
          setUser(null);
        }
      });
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("登出", "確定要登出嗎?", [
      { text: "取消", style: "cancel" },
      {
        text: "登出",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          setUser(null);
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "帳戶和備份",
          headerStyle: { backgroundColor: "#f6f2ef" },
          headerTintColor: "#2b1512",
        }}
      />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {/* 註冊/登入卡片 */}
        <View style={styles.accountCard}>
          <View style={styles.iconPanel}>
            <Text style={styles.icon}>💊</Text>
          </View>
          <View style={styles.accountBody}>
            {user ? (
              <>
                <Text style={styles.accountLabel}>目前登入帳號</Text>
                <Text style={styles.accountName}>{user.name || user.username}</Text>
                <TouchableOpacity style={styles.darkButton} onPress={handleLogout}>
                  <Text style={styles.darkButtonText}>登出</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.accountText}>建立一個帳戶以便備份您的資料。</Text>
                <TouchableOpacity
                  style={styles.darkButton}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.darkButtonText}>註冊/登入</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* 我的資料 */}
        <Text style={styles.sectionLabel}>我的資料</Text>
        <Text style={styles.sectionText}>
          {user
            ? `您目前以 ${user.username}(ID: ${user.user_id})登入 My Doctor。`
            : "您目前以未註冊使用者身份使用 My Doctor。註冊以便您的資料得到備份,並且在您更換手機時可以恢復。"}
        </Text>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => showNotAvailable("CSV匯出")}
        >
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>CSV匯出</Text>
            <Text style={styles.optionHint}>匯出與您帳戶相關的資料存檔。</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => showNotAvailable("永久刪除我的資料")}
        >
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, styles.danger]}>永久刪除我的資料</Text>
            <Text style={styles.optionHint}>
              您的帳戶及其所有使用資料將永久刪除,且無法恢復。
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const INK = "#2b1512";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f2ef",
  },
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  accountCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    overflow: "hidden",
  },
  iconPanel: {
    width: "30%",
    backgroundColor: "#fff5f3",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 52,
  },
  accountBody: {
    flex: 1,
    padding: 20,
  },
  accountText: {
    fontSize: 20,
    lineHeight: 29,
    color: INK,
    marginBottom: 18,
  },
  accountLabel: {
    fontSize: 15,
    color: "#6b6260",
    marginBottom: 4,
  },
  accountName: {
    fontSize: 22,
    color: INK,
    marginBottom: 18,
  },
  darkButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  darkButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  sectionLabel: {
    fontSize: 17,
    color: "#6b6260",
    marginTop: 32,
    marginHorizontal: 4,
  },
  sectionText: {
    fontSize: 17,
    lineHeight: 25,
    color: "#5c5250",
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    color: "#3a302e",
    marginBottom: 6,
  },
  danger: {
    color: "#cc4444",
  },
  optionHint: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b6260",
  },
  chevron: {
    fontSize: 28,
    color: "#8a7f7c",
    marginLeft: 8,
  },
});