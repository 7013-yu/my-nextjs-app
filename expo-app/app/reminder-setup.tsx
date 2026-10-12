import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { TimePickerModal } from "@/components/time-picker-modal";
import {
  addTime,
  describeFrequency,
  formatTime,
  removeTime,
  setTime,
  useReminderDraft,
} from "@/hooks/use-reminder-draft";

// 用幾個 View 畫垃圾桶,不用額外的圖示設定
function TrashIcon() {
  return (
    <View style={styles.trash}>
      <View style={styles.trashHandle} />
      <View style={styles.trashLid} />
      <View style={styles.trashBody} />
    </View>
  );
}

export default function ReminderSetupScreen() {
  const router = useRouter();
  const draft = useReminderDraft();
  const [pickerFor, setPickerFor] = useState<string | null>(null);

  const header = (
    <Stack.Screen
      options={{
        title: draft?.measurementName ?? "提醒",
        headerStyle: { backgroundColor: "#f6f2ef" },
        headerTintColor: "#2b1512",
      }}
    />
  );

  // 沒有草稿(例如 App 重新載入後直接停在這一頁)
  if (!draft) {
    return (
      <>
        {header}
        <View style={styles.centered}>
          <Text style={styles.centeredText}>找不到正在設定的測量項目,請回到「我的療程」重新開始。</Text>
          <TouchableOpacity
            style={styles.saveButtonInline}
            onPress={() => router.replace("/(tabs)/treatment")}
          >
            <Text style={styles.saveText}>回到我的療程</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const pickerTime = draft.times.find((t) => t.id === pickerFor);

  const handleRemove = (id: string) => {
    if (!removeTime(id)) {
      Alert.alert("至少需要一個記錄時間", "如果不需要提醒,請在「頻率」改選「根據需要」。");
    }
  };

  return (
    <>
      {header}
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.heroIcon}>🌡️</Text>
            <Text style={styles.heroIcon}>📏</Text>
          </View>
          <Text style={styles.intro}>設定提醒以定期記錄您的測量結果並追蹤您的進度。</Text>

          {/* 頻率 */}
          <TouchableOpacity
            style={styles.frequencyCard}
            onPress={() => router.push("/reminder-frequency")}
          >
            <Text style={styles.frequencyLabel}>頻率</Text>
            <View style={styles.frequencyRight}>
              <Text style={styles.frequencySummary} numberOfLines={1}>
                {describeFrequency(draft)}
              </Text>
              <Text style={styles.pencil}>✎</Text>
            </View>
          </TouchableOpacity>

          {/* 提醒詳情:選「根據需要」就不用設定時間 */}
          {draft.frequency !== "as_needed" && (
            <>
              <Text style={styles.sectionLabel}>提醒詳情</Text>

              {draft.times.map((t, index) => (
                <View key={t.id} style={styles.timeRow}>
                  <Text style={styles.timeLabel}>記錄 {index + 1}</Text>
                  <TouchableOpacity style={styles.timeButton} onPress={() => setPickerFor(t.id)}>
                    <Text style={styles.timeValue}>{formatTime(t.minutes)} ▾</Text>
                  </TouchableOpacity>
                  <TouchableOpacity hitSlop={12} onPress={() => handleRemove(t.id)}>
                    <TrashIcon />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity style={styles.addTime} onPress={addTime}>
                <Text style={styles.addTimeText}>添加記錄時間</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.unitRow}>
            <Text style={styles.unitLabel}>單元</Text>
            <Text style={styles.unitValue}>{draft.unit ?? "未設定"}</Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => Alert.alert("儲存", "儲存功能還在開發中,敬請期待。")}
        >
          <Text style={styles.saveText}>儲存</Text>
        </TouchableOpacity>
      </View>

      {pickerTime && (
        <TimePickerModal
          minutes={pickerTime.minutes}
          onCancel={() => setPickerFor(null)}
          onConfirm={(minutes) => {
            setTime(pickerTime.id, minutes);
            setPickerFor(null);
          }}
        />
      )}
    </>
  );
}

const INK = "#2b1512";
const BROWN = "#8a3a12";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f2ef",
  },
  centered: {
    flex: 1,
    backgroundColor: "#f6f2ef",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  centeredText: {
    fontSize: 17,
    lineHeight: 25,
    color: INK,
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 130,
  },
  hero: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  heroIcon: {
    fontSize: 64,
  },
  intro: {
    fontSize: 17,
    lineHeight: 25,
    color: "#3a302e",
    textAlign: "center",
    marginHorizontal: 12,
    marginBottom: 28,
  },
  frequencyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 62,
    borderRadius: 31,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  frequencyLabel: {
    fontSize: 20,
    color: INK,
  },
  frequencyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  frequencySummary: {
    fontSize: 16,
    color: "#6b6260",
    flexShrink: 1,
  },
  pencil: {
    fontSize: 28,
    color: INK,
  },
  sectionLabel: {
    fontSize: 16,
    color: "#6b6260",
    marginTop: 30,
    marginBottom: 6,
    marginHorizontal: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  timeLabel: {
    flex: 1,
    fontSize: 20,
    color: INK,
  },
  timeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 20,
  },
  timeValue: {
    fontSize: 20,
    color: BROWN,
  },
  trash: {
    width: 24,
    height: 28,
    alignItems: "center",
    marginRight: 4,
  },
  trashHandle: {
    width: 8,
    height: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: INK,
  },
  trashLid: {
    width: 22,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: INK,
  },
  trashBody: {
    width: 16,
    height: 18,
    marginTop: 2,
    borderWidth: 2.5,
    borderTopWidth: 0,
    borderColor: INK,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  addTime: {
    paddingVertical: 18,
    paddingHorizontal: 4,
  },
  addTimeText: {
    fontSize: 20,
    color: BROWN,
  },
  unitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 4,
    marginTop: 24,
  },
  unitLabel: {
    fontSize: 20,
    color: INK,
  },
  unitValue: {
    fontSize: 20,
    color: "#6b6260",
  },
  saveButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 28,
    height: 54,
    borderRadius: 27,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonInline: {
    height: 52,
    borderRadius: 26,
    backgroundColor: INK,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "500",
  },
});