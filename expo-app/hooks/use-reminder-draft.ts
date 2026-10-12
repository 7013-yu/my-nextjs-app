import { useSyncExternalStore } from "react";
import type { Measurement } from "@/constants/measurements";

// 正在設定中的提醒。三個畫面(誰的提醒 → 設定 → 頻率)共用這份暫存資料,
// 還沒按「儲存」之前只存在記憶體裡,關掉 App 就沒了。

export type FrequencyType = "daily" | "every_x_days" | "weekdays" | "as_needed";
export type Period = "am" | "pm";

export interface ReminderTime {
  id: string;
  minutes: number; // 從 00:00 起算的分鐘數,例如 8:00 = 480
}

export interface ReminderDraft {
  measurementId: string;
  measurementName: string;
  unit: string | null;
  frequency: FrequencyType;
  everyXDays: number;
  weekdays: number[]; // 0 = 週日 ... 6 = 週六
  times: ReminderTime[];
}

const DEFAULT_MINUTES = 8 * 60;
const MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
export const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

let draft: ReminderDraft | null = null;
let counter = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());
const nextId = () => `t${++counter}`;

export function subscribeDraft(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getDraft() {
  return draft;
}

export function useReminderDraft(): ReminderDraft | null {
  return useSyncExternalStore(subscribeDraft, getDraft, getDraft);
}

// 選了測量項目之後,開一份新的草稿(預設:每日、一個記錄時間 上午 8:00)
export function startDraft(measurement: Pick<Measurement, "id" | "name" | "unit">) {
  draft = {
    measurementId: measurement.id,
    measurementName: measurement.name,
    unit: measurement.unit ?? null,
    frequency: "daily",
    everyXDays: 2,
    weekdays: [],
    times: [{ id: nextId(), minutes: DEFAULT_MINUTES }],
  };
  emit();
}

export function updateDraft(
  patch: Partial<Pick<ReminderDraft, "frequency" | "everyXDays" | "weekdays">>
) {
  if (!draft) return;
  draft = { ...draft, ...patch };
  emit();
}

// 新增記錄時間:預設比最後一個晚 2 小時
export function addTime() {
  if (!draft) return;
  const last = draft.times[draft.times.length - 1];
  const minutes = last ? (last.minutes + 120) % 1440 : DEFAULT_MINUTES;
  draft = { ...draft, times: [...draft.times, { id: nextId(), minutes }] };
  emit();
}

export function setTime(id: string, minutes: number) {
  if (!draft) return;
  draft = {
    ...draft,
    times: draft.times.map((t) => (t.id === id ? { ...t, minutes } : t)),
  };
  emit();
}

// 至少要留一個記錄時間;刪不掉會回傳 false
export function removeTime(id: string): boolean {
  if (!draft || draft.times.length <= 1) return false;
  draft = { ...draft, times: draft.times.filter((t) => t.id !== id) };
  emit();
  return true;
}

// ---------- 顯示用的小工具 ----------

export function formatTime(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h24 < 12 ? "上午" : "下午"}${h12}:${String(m).padStart(2, "0")}`;
}

export function splitMinutes(minutes: number): { period: Period; hour12: number; minute: number } {
  const h24 = Math.floor(minutes / 60) % 24;
  return {
    period: h24 < 12 ? "am" : "pm",
    hour12: h24 % 12 === 0 ? 12 : h24 % 12,
    minute: minutes % 60,
  };
}

export function joinMinutes(period: Period, hour12: number, minute: number): number {
  const h24 = (hour12 % 12) + (period === "pm" ? 12 : 0);
  return h24 * 60 + minute;
}

export function describeFrequency(d: ReminderDraft): string {
  switch (d.frequency) {
    case "daily":
      return `每日,${d.times.length}次每天`;
    case "every_x_days":
      return `每 ${d.everyXDays} 日`;
    case "weekdays": {
      const days = MON_FIRST.filter((day) => d.weekdays.includes(day));
      return days.length > 0
        ? `每週 ${days.map((day) => WEEKDAY_LABELS[day]).join("、")}`
        : "一周中的特定日子";
    }
    case "as_needed":
      return "根據需要 (沒有提醒)";
  }
}