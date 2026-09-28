import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { describeNetworkError, postJson } from "@/constants/api";

const MIN_ACCOUNT_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 註冊並登入成功後回到設定頁 (清空歷史堆疊)
  const goToSettings = () => {
    if (router.canDismiss()) router.dismissAll();
    router.replace("/(tabs)/settings");
  };

  // 點擊「已有帳戶？登入」按鈕時前往登入頁
  const goToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/login");
    }
  };

  const handleRegister = async () => {
    setError("");
    const account = username.trim();

    if (account.length < MIN_ACCOUNT_LENGTH) {
      setError(`帳號長度必須至少為 ${MIN_ACCOUNT_LENGTH} 個字元`);
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`密碼長度必須至少為 ${MIN_PASSWORD_LENGTH} 個字元`);
      return;
    }

    setLoading(true);
    try {
      // 送出純帳號與密碼進行註冊
      const registered = await postJson("/api/auth/register", {
        username: account,
        password,
      });

      if (!registered.success) {
        setError(registered.message || "註冊失敗，請再試一次");
        return;
      }

      // 註冊成功後自動登入
      const loggedIn = await postJson("/api/auth/login", {
        username: account,
        password,
      });

      if (loggedIn.success) {
        await AsyncStorage.setItem("user", JSON.stringify(loggedIn.user));
        goToSettings();
      } else {
        goToLogin();
      }
    } catch (err) {
      setError(describeNetworkError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "註冊",
          headerStyle: { backgroundColor: "#faf6f5" },
          headerTintColor: "#2b1512",
        }}
      />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandRow}>
          <Text style={styles.brandIcon}>💊</Text>
          <Text style={styles.brandText}>MyTherapy</Text>
        </View>
        <Text style={styles.subtitle}>
          註冊以便備份您的數據，並在您更換設備時恢復。
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="帳號"
          placeholderTextColor="#9a9391"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="密碼"
          placeholderTextColor="#9a9391"
          secureTextEntry
          autoCapitalize="none"
          onSubmitEditing={handleRegister}
          style={styles.input}
        />
        <Text style={styles.hint}>
          密碼長度必須至少為 {MIN_PASSWORD_LENGTH} 個字元。
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? "建立中..." : "建立新帳戶"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>已有帳戶？</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={goToLogin}>
            <Text style={styles.secondaryText}>登入</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#faf6f5",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  brandIcon: {
    fontSize: 26,
  },
  brandText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#e31243",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "#5c5250",
    marginTop: 20,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  input: {
    height: 56,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 17,
    color: "#2b1512",
    marginBottom: 14,
  },
  hint: {
    color: "#6b6260",
    fontSize: 14,
    marginHorizontal: 4,
    marginBottom: 18,
  },
  error: {
    color: "#c62828",
    fontSize: 14,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#220f0d",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  footer: {
    marginTop: 56,
    gap: 12,
  },
  footerLabel: {
    textAlign: "center",
    color: "#5c5250",
    fontSize: 16,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fde3db",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#8a3a12",
    fontSize: 17,
    fontWeight: "600",
  },
});