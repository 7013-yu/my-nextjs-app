import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useReminderDraft } from "@/hooks/use-reminder-draft";

export default function ReminderForScreen() {
  const router = useRouter();
  const draft = useReminderDraft();

  // 兩個按鈕都進到設定畫面。用 replace,這樣從設定畫面按返回會回到搜尋清單,不會又問一次
  const goToSetup = () => router.replace("/reminder-setup");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.screen}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.subject}>{draft?.measurementName ?? ""}</Text>
        <Text style={styles.title}>此提醒針對誰?</Text>
        <Text style={styles.body}>
          如果您為親人管理治療,您可以建立不同的檔案來支持每個人並確保他們保持在正軌上。
        </Text>

        <View style={styles.avatars}>
          <View style={[styles.avatar, { backgroundColor: "#b3d9c5" }]}>
            <Text style={styles.avatarEmoji}>🧑</Text>
          </View>
          <View style={[styles.avatar, styles.overlap, { backgroundColor: "#bfb2d9" }]}>
            <Text style={styles.avatarEmoji}>👵</Text>
          </View>
          <View style={[styles.avatar, styles.overlap, { backgroundColor: "#efb6c8" }]}>
            <Text style={styles.avatarEmoji}>🐶</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addLink}
          onPress={() => Alert.alert("新增護理對象", "此功能還在開發中,敬請期待。")}
        >
          <Text style={styles.addLinkText}>新增護理對象</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <Text style={styles.hint}>您稍後可以隨時在「設定」中新增和管理護理對象</Text>
        <TouchableOpacity style={styles.laterButton} onPress={goToSetup}>
          <Text style={styles.laterText}>稍後提醒我</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selfButton} onPress={goToSetup}>
          <Text style={styles.selfText}>我只管理自己的治療</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const INK = "#2b1512";
const BROWN = "#8a3a12";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f2ef",
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 36,
  },
  back: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3a3331",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  backArrow: {
    color: "#ffffff",
    fontSize: 24,
    marginTop: -2,
  },
  subject: {
    fontSize: 17,
    color: "#6b6260",
    marginHorizontal: 4,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: "#3a302e",
    marginHorizontal: 4,
    marginBottom: 18,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    color: "#5c5250",
    marginHorizontal: 4,
  },
  avatars: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 48,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  overlap: {
    marginLeft: -6,
  },
  avatarEmoji: {
    fontSize: 42,
  },
  addLink: {
    alignItems: "center",
    paddingVertical: 28,
  },
  addLinkText: {
    fontSize: 21,
    color: BROWN,
  },
  spacer: {
    flex: 1,
  },
  hint: {
    fontSize: 15,
    color: "#6b6260",
    marginHorizontal: 4,
    marginBottom: 14,
  },
  laterButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fdddd4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  laterText: {
    fontSize: 20,
    color: BROWN,
  },
  selfButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  selfText: {
    fontSize: 20,
    color: "#ffffff",
  },
});