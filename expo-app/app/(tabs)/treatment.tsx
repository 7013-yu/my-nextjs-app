import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconSymbol } from "@/components/ui/icon-symbol";

const TIP_KEY = "treatment_tip_dismissed";

interface Section {
  key: string;
  title: string;
  icon: string; // 先用表情符號代替插圖
  tileColor: string;
}

const SECTIONS: Section[] = [
  { key: "medication", title: "藥物", icon: "💊", tileColor: "#ece6ff" },
  { key: "measurement", title: "測量", icon: "⚖️", tileColor: "#e6e9ff" },
  { key: "activity", title: "活動", icon: "🏃", tileColor: "#fde4dc" },
  { key: "mood", title: "情緒和症狀", icon: "🙂", tileColor: "#fff3c9" },
];

// 還沒做的功能先跳出提示,不讓按鈕沒反應
function showNotAvailable(feature: string) {
  Alert.alert(feature, "此功能還在開發中,敬請期待。");
}

export default function TreatmentScreen() {
  const router = useRouter();
  const [tipVisible, setTipVisible] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // 提示泡泡關掉過就不再出現
  useEffect(() => {
    AsyncStorage.getItem(TIP_KEY)
      .then((value) => setTipVisible(value !== "1"))
      .catch(() => setTipVisible(true));
  }, []);

  const dismissTip = () => {
    setTipVisible(false);
    AsyncStorage.setItem(TIP_KEY, "1").catch(() => {});
  };

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* 標題列 */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>我的療程</Text>
        <TouchableOpacity
          hitSlop={12}
          onPress={() => router.navigate("/(tabs)/settings")}
        >
          <IconSymbol size={28} name="gearshape.fill" color={INK} />
        </TouchableOpacity>
      </View>

      {/* 提示泡泡 */}
      {tipVisible && (
        <View style={styles.tipWrap}>
          <View style={styles.tip}>
            <View style={styles.tipTitleRow}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipTitle}>這是你的治療計劃</Text>
              <TouchableOpacity hitSlop={12} onPress={dismissTip}>
                <Text style={styles.tipClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.tipText}>您可以在此處添加藥物並自訂提醒。</Text>
          </View>
          <View style={styles.tipPointer} />
        </View>
      )}

      {/* 四個分類 */}
      {SECTIONS.map((section) => {
        const isCollapsed = !!collapsed[section.key];
        return (
          <View key={section.key} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.key)}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View
                style={{
                  transform: [{ rotate: isCollapsed ? "90deg" : "-90deg" }],
                }}
              >
                <IconSymbol size={20} name="chevron.right" color="#6b6260" />
              </View>
            </TouchableOpacity>

            {!isCollapsed && (
              <TouchableOpacity
                style={styles.emptyCard}
                onPress={() =>
                  section.key === "measurement"
                    ? router.push("/measurement-search")
                    : showNotAvailable(`新增${section.title}`)
                }
              >
                <View style={[styles.tile, { backgroundColor: section.tileColor }]}>
                  <Text style={styles.tileIcon}>{section.icon}</Text>
                </View>
                <Text style={styles.emptyText}>尚未添加!</Text>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => showNotAvailable("開始")}
      >
        <Text style={styles.startText}>開始</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const INK = "#2b1512";
const TIP_BG = "#d5cffa";

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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  tipWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  tip: {
    width: "88%",
    backgroundColor: TIP_BG,
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  tipTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipTitle: {
    flex: 1,
    fontSize: 20,
    color: INK,
  },
  tipClose: {
    fontSize: 22,
    color: INK,
  },
  tipText: {
    fontSize: 16,
    color: INK,
    marginTop: 10,
    marginLeft: 30,
  },
  tipPointer: {
    width: 20,
    height: 20,
    backgroundColor: TIP_BG,
    transform: [{ rotate: "45deg" }],
    marginTop: -10,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 19,
    color: "#5c5250",
  },
  emptyCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#bdb4b0",
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  tile: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIcon: {
    fontSize: 32,
  },
  emptyText: {
    flex: 1,
    fontSize: 18,
    color: "#5c5250",
    marginLeft: 20,
  },
  plus: {
    fontSize: 38,
    color: INK,
    fontWeight: "200",
    marginRight: 6,
  },
  startButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  startText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "600",
  },
});