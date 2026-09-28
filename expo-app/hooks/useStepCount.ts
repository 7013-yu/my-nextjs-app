import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Pedometer } from "expo-sensors";

interface StepCountState {
  isAvailable: boolean | null; // null = 還在檢查中
  todaySteps: number; // 今天累積步數(iOS 有效,Android 目前無法查歷史區間)
  liveSteps: number; // App 開著期間即時累計的步數(iOS/Android 都支援)
}

export function useStepCount(): StepCountState {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [todaySteps, setTodaySteps] = useState(0);
  const [liveSteps, setLiveSteps] = useState(0);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null =
      null;

    const setup = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (!available) return;

      // iOS 會跳出「動作與健康」權限詢問,Android 通常不需要額外詢問
      await Pedometer.requestPermissionsAsync();

      // 只有 iOS 支援查詢「今天到現在」的歷史步數
      if (Platform.OS === "ios") {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        try {
          const result = await Pedometer.getStepCountAsync(start, end);
          setTodaySteps(result.steps);
        } catch (e) {
          console.log("取得今日步數失敗", e);
        }
      }

      // 即時計步,兩個平台都支援,但只會計算「App開著之後」的步數
      subscription = Pedometer.watchStepCount((result) => {
        setLiveSteps(result.steps);
      });
    };

    setup();

    return () => {
      subscription?.remove();
    };
  }, []);

  return { isAvailable, todaySteps, liveSteps };
}