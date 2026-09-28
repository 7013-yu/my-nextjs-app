import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "step_history_v1"; // { "2026-06-01": 3200, "2026-06-02": 4100, ... }
const HISTORY_DAYS = 30;

interface DailyStep {
  date: string; // YYYY-MM-DD
  steps: number;
}

function todayKey(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

async function readHistoryMap(): Promise<Record<string, number>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function writeHistoryMap(map: Record<string, number>) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function useStepHistory() {
  const [history, setHistory] = useState<DailyStep[]>([]);
  const [todaySteps, setTodaySteps] = useState(0);
  const [averageSteps, setAverageSteps] = useState(0);
  const [loading, setLoading] = useState(true);

  const buildLastNDays = useCallback((map: Record<string, number>) => {
    const result: DailyStep[] = [];
    for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      result.push({ date: key, steps: map[key] || 0 });
    }
    return result;
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);

    // 1. 取得今天目前的步數(iOS 用系統歷史查詢,Android 用即時計數,跟之前 useStepCount 邏輯一致)
    let stepsToday = 0;
    try {
      const available = await Pedometer.isAvailableAsync();
      if (available) {
        await Pedometer.requestPermissionsAsync();
        if (Platform.OS === "ios") {
          const end = new Date();
          const start = new Date();
          start.setHours(0, 0, 0, 0);
          const result = await Pedometer.getStepCountAsync(start, end);
          stepsToday = result.steps;
        }
        // Android 目前無法查今日累積,先以0起算,靠即時監聽另外處理(見 useStepCount)
      }
    } catch (e) {
      console.log("讀取步數失敗", e);
    }

    // 2. 把今天的數字存進歷史紀錄(覆蓋今天這一筆,累積效果會逐日疊加)
    const map = await readHistoryMap();
    const key = todayKey();
    if (stepsToday > (map[key] || 0)) {
      map[key] = stepsToday;
      await writeHistoryMap(map);
    }

    // 3. 組出過去30天陣列(含今天)
    const last30 = buildLastNDays(map);
    setHistory(last30);
    setTodaySteps(map[key] || 0);

    const daysWithData = last30.filter((d) => d.steps > 0);
    const avg = daysWithData.length
      ? Math.round(
          daysWithData.reduce((sum, d) => sum + d.steps, 0) /
            daysWithData.length
        )
      : 0;
    setAverageSteps(avg);

    setLoading(false);
  }, [buildLastNDays]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { history, todaySteps, averageSteps, loading, refresh };
}