import { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { joinMinutes, Period, splitMinutes } from "@/hooks/use-reminder-draft";

const ITEM_H = 46;
const VISIBLE_ITEMS = 5;

interface Option<T> {
  label: string;
  value: T;
}

const PERIOD_OPTIONS: Option<Period>[] = [
  { label: "上午", value: "am" },
  { label: "下午", value: "pm" },
];
const HOUR_OPTIONS: Option<number>[] = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));
const MINUTE_OPTIONS: Option<number>[] = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: i,
}));

interface ColumnProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  width: number;
}

// 一欄可以上下捲的選項,點一下就選取
function Column<T extends string | number>({ options, value, onChange, width }: ColumnProps<T>) {
  const ref = useRef<ScrollView>(null);
  const scrolled = useRef(false);

  // 剛打開時,把目前的選項捲到中間附近
  const scrollToSelected = () => {
    if (scrolled.current) return;
    scrolled.current = true;
    const index = options.findIndex((o) => o.value === value);
    ref.current?.scrollTo({ y: Math.max(0, index - 2) * ITEM_H, animated: false });
  };

  return (
    <ScrollView
      ref={ref}
      onLayout={scrollToSelected}
      style={{ width, height: ITEM_H * VISIBLE_ITEMS }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <TouchableOpacity
            key={String(o.value)}
            style={[styles.item, active && styles.itemActive]}
            onPress={() => onChange(o.value)}
          >
            <Text style={[styles.itemText, active && styles.itemTextActive]}>{o.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

interface TimePickerModalProps {
  minutes: number; // 目前的時間(從 00:00 起算的分鐘數)
  onConfirm: (minutes: number) => void;
  onCancel: () => void;
}

// 只在要選時間的時候才畫出來(父層用條件渲染),所以每次打開都會從目前時間開始
export function TimePickerModal({ minutes, onConfirm, onCancel }: TimePickerModalProps) {
  const initial = splitMinutes(minutes);
  const [period, setPeriod] = useState<Period>(initial.period);
  const [hour, setHour] = useState(initial.hour12);
  const [minute, setMinute] = useState(initial.minute);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.root}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={styles.sheet}>
          <Text style={styles.title}>選擇時間</Text>

          <View style={styles.columns}>
            <Column options={PERIOD_OPTIONS} value={period} onChange={setPeriod} width={92} />
            <Column options={HOUR_OPTIONS} value={hour} onChange={setHour} width={80} />
            <Text style={styles.colon}>:</Text>
            <Column options={MINUTE_OPTIONS} value={minute} onChange={setMinute} width={80} />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ok}
              onPress={() => onConfirm(joinMinutes(period, hour, minute))}
            >
              <Text style={styles.okText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const INK = "#2b1512";
const BROWN = "#8a3a12";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 18,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: "#6b6260",
    textAlign: "center",
    marginBottom: 8,
  },
  columns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  colon: {
    fontSize: 24,
    color: INK,
    marginHorizontal: 2,
  },
  item: {
    height: ITEM_H,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  itemActive: {
    backgroundColor: "#fdddd4",
  },
  itemText: {
    fontSize: 22,
    color: "#6b6260",
  },
  itemTextActive: {
    color: BROWN,
    fontWeight: "700",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  cancel: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1ebe8",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 18,
    color: INK,
  },
  ok: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  okText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
});