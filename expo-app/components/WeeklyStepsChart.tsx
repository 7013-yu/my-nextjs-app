import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DayData {
  date: string; // YYYY-MM-DD
  steps: number;
}

interface WeeklyStepsChartProps {
  data: DayData[]; // 應該是最近7天,由舊到新排序
}

const WEEKDAY_LABELS = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

function getWeekdayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return WEEKDAY_LABELS[d.getDay()];
}

function formatFullDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export function WeeklyStepsChart({ data }: WeeklyStepsChartProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.steps), 1);
  // 找一個好看的整數當作 Y 軸最大刻度(無條件進位到最近的 500)
  const axisMax = Math.max(Math.ceil(max / 500) * 500, 500);

  const average = data.length
    ? Math.round(data.reduce((sum, d) => sum + d.steps, 0) / data.length)
    : 0;

  const selected = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <View>
      {/* 上方摘要區:點了某一天顯示「總計」,沒點的話顯示「平均」 */}
      <View style={styles.summary}>
        {selected ? (
          <>
            <Text style={styles.summaryLabel}>總計</Text>
            <Text style={styles.summaryValue}>{selected.steps} 步</Text>
            <Text style={styles.summaryDate}>{formatFullDate(selected.date)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.summaryLabel}>平均</Text>
            <Text style={styles.summaryValue}>{average} 步</Text>
            <Text style={styles.summaryDate}>
              {formatShortDate(data[0]?.date)} 至 {formatShortDate(data[data.length - 1]?.date)}
            </Text>
          </>
        )}
      </View>

      {/* Y 軸刻度線 */}
      <View style={styles.chartArea}>
        <View style={styles.gridLines}>
          <Text style={styles.gridLabel}>{axisMax}</Text>
          <Text style={styles.gridLabel}>0</Text>
        </View>

        {/* 長條圖本體 */}
        <View style={styles.barsRow}>
          {data.map((d, i) => {
            const heightPercent = (d.steps / axisMax) * 100;
            const isSelected = selectedIndex === i;
            return (
              <TouchableOpacity
                key={d.date}
                style={styles.barColumn}
                activeOpacity={0.7}
                onPress={() =>
                  setSelectedIndex(selectedIndex === i ? null : i)
                }
              >
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${Math.max(heightPercent, d.steps > 0 ? 3 : 0)}%`,
                        backgroundColor: isSelected ? "#3f2e5e" : "#e0785a",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.weekdayLabel}>{getWeekdayLabel(d.date)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginBottom: 20,
  },
  summaryLabel: {
    color: "#999",
    fontSize: 13,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
  },
  summaryDate: {
    color: "#999",
    fontSize: 13,
    marginTop: 2,
  },
  chartArea: {
    flexDirection: "row",
    height: 180,
  },
  gridLines: {
    width: 40,
    height: "100%",
    paddingBottom: 24, // 對齊底下的星期文字高度
    justifyContent: "space-between",
  },
  gridLabel: {
    fontSize: 11,
    color: "#bbb",
  },
  barsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barTrack: {
    flex: 1,
    width: "60%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 3,
  },
  weekdayLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    height: 18,
  },
});