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
import {
  FrequencyType,
  getDraft,
  updateDraft,
} from "@/hooks/use-reminder-draft";

const OPTIONS: { value: FrequencyType; label: string }[] = [
  { value: "daily", label: "每日,X次每天" },
  { value: "every_x_days", label: "每 X 日" },
  { value: "weekdays", label: "一周中的特定日子" },
  { value: "as_needed", label: "根據需要 (沒有提醒)" },
];

// 星期一排最前面(0 = 週日)
const WEEKDAY_CHIPS = [
  { value: 1, label: "一" },
  { value: 2, label: "二" },
  { value: 3, label: "三" },
  { value: 4, label: "四" },
  { value: 5, label: "五" },
  { value: 6, label: "六" },
  { value: 0, label: "日" },
];

const MIN_DAYS = 2;
const MAX_DAYS = 30;

export default function ReminderFrequencyScreen() {
  const router = useRouter();
  // 進來時讀一次目前的設定當起點,按「確認」才會寫回去
  const [initial] = useState(getDraft);
  const [frequency, setFrequency] = useState<FrequencyType>(initial?.frequency ?? "daily");
  const [everyXDays, setEveryXDays] = useState(initial?.everyXDays ?? MIN_DAYS);
  const [weekdays, setWeekdays] = useState<number[]>(initial?.weekdays ?? []);

  const header = (
    <Stack.Screen
      options={{
        title: "頻率",
        headerStyle: { backgroundColor: "#f6f2ef" },
        headerTintColor: "#2b1512",
      }}
    />
  );

  if (!initial) {
    return (
      <>
        {header}
        <View style={styles.centered}>
          <Text style={styles.centeredText}>找不到正在設定的測量項目,請回到「我的療程」重新開始。</Text>
          <TouchableOpacity
            style={styles.confirmInline}
            onPress={() => router.replace("/(tabs)/treatment")}
          >
            <Text style={styles.confirmText}>回到我的療程</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const toggleWeekday = (day: number) => {
    setWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleConfirm = () => {
    if (frequency === "weekdays" && weekdays.length === 0) {
      Alert.alert("請選擇日子", "請至少選擇一天。");
      return;
    }
    updateDraft({ frequency, everyXDays, weekdays });
    router.back();
  };

  return (
    <>
      {header}
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          {OPTIONS.map((option) => {
            const selected = option.value === frequency;
            return (
              <TouchableOpacity
                key={option.value}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setFrequency(option.value)}
              >
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>{option.label}</Text>
                  <View style={[styles.radio, selected && styles.radioSelected]}>
                    {selected && <View style={styles.radioDot} />}
                  </View>
                </View>

                {selected && option.value === "daily" && (
                  <Text style={styles.cardHint}>
                    X 是您在上一頁新增的「記錄」時間數量。
                  </Text>
                )}

                {selected && option.value === "every_x_days" && (
                  <View style={styles.stepper}>
                    <TouchableOpacity
                      style={styles.stepButton}
                      onPress={() => setEveryXDays((n) => Math.max(MIN_DAYS, n - 1))}
                    >
                      <Text style={styles.stepText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.stepValue}>每 {everyXDays} 日</Text>
                    <TouchableOpacity
                      style={styles.stepButton}
                      onPress={() => setEveryXDays((n) => Math.min(MAX_DAYS, n + 1))}
                    >
                      <Text style={styles.stepText}>＋</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selected && option.value === "weekdays" && (
                  <View style={styles.chips}>
                    {WEEKDAY_CHIPS.map((chip) => {
                      const on = weekdays.includes(chip.value);
                      return (
                        <TouchableOpacity
                          key={chip.value}
                          style={[styles.chip, on && styles.chipOn]}
                          onPress={() => toggleWeekday(chip.value)}
                        >
                          <Text style={[styles.chipText, on && styles.chipTextOn]}>
                            {chip.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {selected && option.value === "as_needed" && (
                  <Text style={styles.cardHint}>不會設定提醒,需要時再自行記錄。</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>確認</Text>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabel: {
    flex: 1,
    fontSize: 20,
    color: "#3a302e",
  },
  cardHint: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b6260",
    marginTop: 12,
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: "#9a9391",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: "#6b3b2e",
  },
  radioDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#6b3b2e",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 18,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fdddd4",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontSize: 24,
    color: BROWN,
  },
  stepValue: {
    minWidth: 90,
    textAlign: "center",
    fontSize: 22,
    color: INK,
  },
  chips: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  chip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1ebe8",
    alignItems: "center",
    justifyContent: "center",
  },
  chipOn: {
    backgroundColor: INK,
  },
  chipText: {
    fontSize: 17,
    color: INK,
  },
  chipTextOn: {
    color: "#ffffff",
    fontWeight: "600",
  },
  confirmButton: {
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
  confirmInline: {
    height: 52,
    borderRadius: 26,
    backgroundColor: INK,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "500",
  },
});