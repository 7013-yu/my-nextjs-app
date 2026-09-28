import { View, Text, StyleSheet } from "react-native";

interface StepsBarChartProps {
  data: { date: string; steps: number }[];
}

export function StepsBarChart({ data }: StepsBarChartProps) {
  const max = Math.max(...data.map((d) => d.steps), 1); // 避免除以0

  return (
    <View style={styles.container}>
      {data.map((d) => {
        const heightPercent = (d.steps / max) * 100;
        return (
          <View key={d.date} style={styles.barWrapper}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  { height: `${Math.max(heightPercent, d.steps > 0 ? 4 : 0)}%` },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    gap: 2,
  },
  barWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  barTrack: {
    height: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    backgroundColor: "#e0785a",
    borderRadius: 2,
    minHeight: 0,
  },
});