import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { describeNetworkError, getJson, putJson } from "@/constants/api";

type Unit = "metric" | "imperial";
type Gender = "男" | "女" | "其他";

interface CachedUser {
  user_id: string;
  username: string;
  name: string | null;
  nickname?: string | null;
  [key: string]: unknown;
}

interface Option<T> {
  label: string;
  value: T;
}

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;
const THIS_YEAR = new Date().getFullYear();

const GENDER_OPTIONS: Option<Gender>[] = [
  { label: "男性", value: "男" },
  { label: "女性", value: "女" },
  { label: "其他", value: "其他" },
];

const UNIT_OPTIONS: Option<Unit>[] = [
  { label: "公斤/公分", value: "metric" },
  { label: "磅/英吋", value: "imperial" },
];

const COUNTRY_OPTIONS: Option<string>[] = [
  "台灣", "日本", "韓國", "中國", "香港", "澳門", "新加坡", "馬來西亞",
  "泰國", "越南", "菲律賓", "印尼", "印度", "美國", "加拿大", "英國",
  "德國", "法國", "澳洲", "紐西蘭", "其他",
].map((c) => ({ label: c, value: c }));

// 從今年往回到 1920 年
const YEAR_OPTIONS: Option<number>[] = Array.from(
  { length: THIS_YEAR - 1919 },
  (_, i) => ({ label: `${THIS_YEAR - i}年`, value: THIS_YEAR - i })
);

function parseNumber(text: string): number | null {
  const n = parseFloat(text.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// 只留數字和一個小數點(逗號當小數點)
function cleanNumber(text: string): string {
  const t = text.replace(",", ".").replace(/[^0-9.]/g, "");
  const firstDot = t.indexOf(".");
  return firstDot === -1
    ? t
    : t.slice(0, firstDot + 1) + t.slice(firstDot + 1).replace(/\./g, "");
}

// 體重目前只存在這支手機上,用使用者代碼當 key
const weightKey = (userId: string) => `profile_weight_kg:${userId}`;

// ---------- 下拉選單列 ----------
interface SelectRowProps<T> {
  label: string;
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  variant?: "plain" | "pill"; // pill = 白色膠囊樣式(國家那一列)
}

function SelectRow<T extends string | number>({
  label,
  options,
  value,
  onChange,
  variant = "plain",
}: SelectRowProps<T>) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <>
      {variant === "pill" ? (
        <TouchableOpacity style={styles.pillRow} onPress={() => setOpen(true)}>
          <Text style={styles.pillLabel}>{label}</Text>
          <Text style={styles.pillValue}>{current ? current.label : "選擇 ..."}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.row} onPress={() => setOpen(true)}>
          <Text style={styles.rowLabel}>{label}</Text>
          <Text style={styles.rowValue}>
            {current ? current.label : "選擇 ..."} ▾
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(o) => String(o.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

function Avatar() {
  return (
    <View style={styles.avatar}>
      <View style={styles.avatarHead} />
      <View style={styles.avatarBody} />
    </View>
  );
}

// ---------- 數字輸入列(體重、身高) ----------
// 點整列會跳出輸入視窗(輸入框不放在可點擊的列裡面,避免 iOS 上點不到輸入框)
interface NumberRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unitLabel: string;
}

function NumberRow({ label, value, onChange, unitLabel }: NumberRowProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const openDialog = () => {
    setDraft(value);
    setOpen(true);
  };

  const confirm = () => {
    onChange(draft.trim());
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.row} onPress={openDialog}>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.valueGroup}>
          <Text style={[styles.rowValue, !value && styles.placeholderValue]}>
            {value || "0"}
          </Text>
          <Text style={styles.rowValue}>{unitLabel}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.dialogRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
          <View style={styles.dialog}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <View style={styles.dialogInputRow}>
              <TextInput
                value={draft}
                onChangeText={(t) => setDraft(cleanNumber(t))}
                placeholder="0"
                placeholderTextColor="#c9b8b0"
                keyboardType="decimal-pad"
                autoFocus
                selectTextOnFocus
                maxLength={6}
                style={styles.dialogInput}
              />
              <Text style={styles.dialogUnit}>{unitLabel}</Text>
            </View>
            <View style={styles.dialogButtons}>
              <TouchableOpacity style={styles.dialogCancel} onPress={() => setOpen(false)}>
                <Text style={styles.dialogCancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dialogOk} onPress={confirm}>
                <Text style={styles.dialogOkText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ---------- 主畫面 ----------
export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<CachedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [unit, setUnit] = useState<Unit>("metric");
  const [weightText, setWeightText] = useState("");
  const [heightText, setHeightText] = useState("");

  // 進入畫面時讀取登入狀態與雲端的個人資料
  useEffect(() => {
    let active = true;

    (async () => {
      let cached: CachedUser | null = null;
      try {
        const stored = await AsyncStorage.getItem("user");
        cached = stored ? JSON.parse(stored) : null;
      } catch {
        cached = null;
      }
      if (!active) return;
      setUser(cached);

      if (!cached) {
        setLoading(false);
        return;
      }

      try {
        const data = await getJson(
          `/api/profile?user_id=${encodeURIComponent(cached.user_id)}`
        );
        if (!active) return;

        if (data.success) {
          const p = data.profile;
          const loadedUnit: Unit = p.unit_preference === "imperial" ? "imperial" : "metric";
          setNickname(p.nickname ?? "");
          setCountry(p.country ?? null);
          setPostalCode(p.postal_code ?? "");
          setGender(p.gender ?? null);
          setBirthYear(p.birth_year ?? null);
          setUnit(loadedUnit);
          if (typeof p.height === "number") {
            setHeightText(
              String(round2(loadedUnit === "imperial" ? p.height / CM_PER_IN : p.height))
            );
          }

          const savedWeight = await AsyncStorage.getItem(weightKey(cached.user_id));
          const kg = savedWeight ? parseFloat(savedWeight) : NaN;
          if (Number.isFinite(kg) && kg > 0) {
            setWeightText(
              String(round2(loadedUnit === "imperial" ? kg / KG_PER_LB : kg))
            );
          }
        } else {
          setError(data.message || "讀取個人資料失敗");
        }
      } catch (err) {
        if (active) setError(describeNetworkError(err));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // 換算成公斤/公分(不管畫面用哪種單位,送出和計算 BMI 都用公制)
  const weightKg = useMemo(() => {
    const w = parseNumber(weightText);
    return w === null ? null : unit === "metric" ? w : w * KG_PER_LB;
  }, [weightText, unit]);

  const heightCm = useMemo(() => {
    const h = parseNumber(heightText);
    return h === null ? null : unit === "metric" ? h : h * CM_PER_IN;
  }, [heightText, unit]);

  const bmi =
    weightKg !== null && heightCm !== null
      ? weightKg / ((heightCm / 100) * (heightCm / 100))
      : null;

  // 切換單位時,把已填的體重/身高一起換算
  const changeUnit = (next: Unit) => {
    if (next === unit) return;
    const w = parseNumber(weightText);
    const h = parseNumber(heightText);
    if (next === "imperial") {
      if (w !== null) setWeightText(String(round2(w / KG_PER_LB)));
      if (h !== null) setHeightText(String(round2(h / CM_PER_IN)));
    } else {
      if (w !== null) setWeightText(String(round2(w * KG_PER_LB)));
      if (h !== null) setHeightText(String(round2(h * CM_PER_IN)));
    }
    setUnit(next);
  };

  const handleSave = async () => {
    if (!user) return;
    setError("");

    if (heightText.trim() !== "" && heightCm === null) {
      setError("請輸入正確的身高");
      return;
    }
    if (heightCm !== null && (heightCm < 50 || heightCm > 250)) {
      setError("身高超出合理範圍");
      return;
    }
    if (weightText.trim() !== "" && weightKg === null) {
      setError("請輸入正確的體重");
      return;
    }
    if (weightKg !== null && (weightKg < 1 || weightKg > 500)) {
      setError("體重超出合理範圍");
      return;
    }

    setSaving(true);
    try {
      const data = await putJson("/api/profile", {
        user_id: user.user_id,
        nickname,
        country,
        postal_code: postalCode,
        gender,
        birth_year: birthYear,
        unit_preference: unit,
        height: heightCm === null ? null : round2(heightCm),
      });

      if (!data.success) {
        setError(data.message || "儲存失敗,請再試一次");
        return;
      }

      // 體重目前只存在這支手機上(資料庫的使用者表沒有體重欄位)
      if (weightKg === null) {
        await AsyncStorage.removeItem(weightKey(user.user_id));
      } else {
        await AsyncStorage.setItem(weightKey(user.user_id), String(round2(weightKg)));
      }

      // 更新本機快取的使用者資料,設定頁的暱稱才會馬上換
      const stored = await AsyncStorage.getItem("user");
      const cached = stored ? JSON.parse(stored) : user;
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...cached, nickname: nickname.trim() || null })
      );

      router.back();
    } catch (err) {
      setError(describeNetworkError(err));
    } finally {
      setSaving(false);
    }
  };

  const header = (
    <Stack.Screen
      options={{
        title: "個人資料詳情",
        headerStyle: { backgroundColor: "#f6f2ef" },
        headerTintColor: "#2b1512",
      }}
    />
  );

  if (loading) {
    return (
      <>
        {header}
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#8a3a12" />
        </View>
      </>
    );
  }

  if (!user) {
    return (
      <>
        {header}
        <View style={styles.centered}>
          <Text style={styles.emptyText}>請先登入才能編輯個人資料。</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.loginButtonText}>前往登入</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      {header}
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarWrap}>
            <Avatar />
          </View>

          <TextInput
            value={nickname}
            onChangeText={setNickname}
            placeholder="暱稱"
            placeholderTextColor="#9a9391"
            maxLength={50}
            style={styles.pillInput}
          />

          <View style={styles.pillGap} />
          <SelectRow variant="pill" label="國家" options={COUNTRY_OPTIONS} value={country} onChange={setCountry} />

          <View style={styles.pillGap} />
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="郵政編碼"
            placeholderTextColor="#9a9391"
            maxLength={10}
            autoCapitalize="characters"
            style={styles.pillInput}
          />
          <Text style={styles.hint}>這些資訊將用於根據您所居住的地區提供功能、內容和建議。</Text>

          <SelectRow label="性別" options={GENDER_OPTIONS} value={gender} onChange={setGender} />
          <SelectRow label="出生年份" options={YEAR_OPTIONS} value={birthYear} onChange={setBirthYear} />
          <Text style={styles.hint}>
            該資訊將用於識別與您的藥物相關的潛在安全風險(即將推出)。
          </Text>

          <SelectRow label="單位偏好" options={UNIT_OPTIONS} value={unit} onChange={changeUnit} />

          <NumberRow
            label="體重"
            value={weightText}
            onChange={setWeightText}
            unitLabel={unit === "metric" ? "公斤" : "磅"}
          />

          <NumberRow
            label="身高"
            value={heightText}
            onChange={setHeightText}
            unitLabel={unit === "metric" ? "公分" : "英吋"}
          />

          <View style={styles.row}>
            <Text style={styles.bmiLabel}>BMI</Text>
            <Text style={styles.bmiValue}>{bmi === null ? "0" : bmi.toFixed(1)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>ⓘ</Text>
            <Text style={styles.infoText}>
              18 歲以上成年人的健康 BMI(身體質量指數)範圍為 18.5 至 24.9。然而,BMI
              並不區分體脂和肌肉質量,這意味著 BMI 指南有一些例外情況。
            </Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.disabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveText}>{saving ? "儲存中..." : "儲存"}</Text>
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
  emptyText: {
    fontSize: 18,
    color: INK,
    marginBottom: 20,
  },
  loginButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: INK,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 130,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fde4dc",
    borderWidth: 1.5,
    borderColor: INK,
    overflow: "hidden",
    alignItems: "center",
  },
  avatarHead: {
    position: "absolute",
    top: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#d4cbf7",
    borderWidth: 1.5,
    borderColor: INK,
  },
  avatarBody: {
    position: "absolute",
    bottom: -14,
    width: 58,
    height: 42,
    borderRadius: 29,
    backgroundColor: "#d4cbf7",
    borderWidth: 1.5,
    borderColor: INK,
  },
  pillInput: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    fontSize: 18,
    color: INK,
  },
  pillGap: {
    height: 14,
  },
  pillRow: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pillLabel: {
    fontSize: 18,
    color: INK,
  },
  pillValue: {
    fontSize: 18,
    color: BROWN,
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b6260",
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  rowLabel: {
    fontSize: 20,
    color: INK,
  },
  rowValue: {
    fontSize: 20,
    color: BROWN,
  },
  valueGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  placeholderValue: {
    color: "#c9b8b0",
  },
  dialogRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 140,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  dialog: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
  },
  dialogInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 18,
  },
  dialogInput: {
    minWidth: 130,
    textAlign: "center",
    fontSize: 32,
    color: BROWN,
    borderBottomWidth: 1.5,
    borderBottomColor: BROWN,
    paddingVertical: 6,
  },
  dialogUnit: {
    fontSize: 20,
    color: BROWN,
  },
  dialogButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  dialogCancel: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1ebe8",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogCancelText: {
    fontSize: 18,
    color: INK,
  },
  dialogOk: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogOkText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
  bmiLabel: {
    fontSize: 20,
    color: "#6b6260",
  },
  bmiValue: {
    fontSize: 20,
    color: "#6b6260",
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 8,
    marginTop: 4,
  },
  infoIcon: {
    fontSize: 18,
    color: "#8a7f7c",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: "#6b6260",
  },
  error: {
    color: "#c62828",
    fontSize: 15,
    marginTop: 18,
    marginHorizontal: 8,
  },
  saveButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 28,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fdddd4",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: BROWN,
    fontSize: 19,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.6,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "60%",
    paddingTop: 18,
    paddingBottom: 24,
  },
  sheetTitle: {
    fontSize: 16,
    color: "#6b6260",
    textAlign: "center",
    marginBottom: 8,
  },
  optionRow: {
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  optionText: {
    fontSize: 19,
    color: INK,
  },
  optionSelected: {
    color: BROWN,
    fontWeight: "700",
  },
});