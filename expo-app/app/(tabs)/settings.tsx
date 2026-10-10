import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  user_id: string;
  username: string;
  name: string | null;
  nickname?: string | null;
}

// 還沒做的功能先跳出提示,不讓按鈕沒反應
function showNotAvailable(feature: string) {
  Alert.alert(feature, "此功能還在開發中,敬請期待。");
}

export default function SettingsScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  // 每次切回設定分頁都重新讀取登入狀態(登入/登出後回來要更新畫面)
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

  const displayName = user ? user.nickname || user.name || user.username : "訪客用戶";

  const menuItems = [
    { label: "帳戶和備份", onPress: () => router.push("/account") },
    { label: "提醒設定", onPress: () => showNotAvailable("提醒設定") },
    { label: "通知類別", onPress: () => showNotAvailable("通知類別") },
    { label: "偏好設定", onPress: () => showNotAvailable("偏好設定") },
    { label: "匯出藥物計畫", onPress: () => showNotAvailable("匯出藥物計畫") },
    { label: "藥物資料庫", onPress: () => showNotAvailable("藥物資料庫") },
    { label: "外觀", onPress: () => showNotAvailable("外觀") },
    { label: "應用程式擴充功能", onPress: () => showNotAvailable("應用程式擴充功能") },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>設定</Text>

      {/* 個人資料卡片 */}
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
            {!user?.nickname && <View style={styles.badge} />}
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileHint}>
              完善您的個人資料,讓使用體驗更完整。
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileLink}
          // 沒登入先去登入,登入後才能編輯個人資料
          onPress={() => router.push(user ? "/profile" : "/login")}
        >
          <Text style={styles.linkText}>完成您的個人資料</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.peachButton}
        onPress={() => showNotAvailable("新增護理對象")}
      >
        <Text style={styles.peachText}>新增護理對象</Text>
      </TouchableOpacity>

      {/* 通用選單 */}
      <Text style={styles.sectionLabel}>通用</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.menuRow}
          onPress={item.onPress}
        >
          <Text style={styles.menuLabel}>{item.label}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const INK = "#2b1512";
const BROWN = "#8a3a12";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f2ef",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 20,
    marginHorizontal: 8,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarWrap: {
    width: 84,
    height: 84,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fde4dc",
    borderWidth: 1.5,
    borderColor: INK,
    overflow: "hidden",
    alignItems: "center",
  },
  avatarHead: {
    position: "absolute",
    top: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#d4cbf7",
    borderWidth: 1.5,
    borderColor: INK,
  },
  avatarBody: {
    position: "absolute",
    bottom: -14,
    width: 58,
    height: 42,
    borderRadius: 29,
    backgroundColor: "#d4cbf7",
    borderWidth: 1.5,
    borderColor: INK,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#d93036",
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    color: INK,
    marginBottom: 4,
  },
  profileHint: {
    fontSize: 15,
    lineHeight: 21,
    color: "#6b6260",
  },
  profileLink: {
    alignItems: "center",
    paddingVertical: 18,
  },
  linkText: {
    color: BROWN,
    fontSize: 18,
    fontWeight: "500",
  },
  peachButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fdddd4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  peachText: {
    color: BROWN,
    fontSize: 18,
    fontWeight: "500",
  },
  sectionLabel: {
    fontSize: 15,
    color: "#6b6260",
    marginTop: 32,
    marginBottom: 6,
    marginHorizontal: 8,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  menuLabel: {
    fontSize: 19,
    color: INK,
  },
  chevron: {
    fontSize: 28,
    color: "#8a7f7c",
    marginTop: -4,
  },
});