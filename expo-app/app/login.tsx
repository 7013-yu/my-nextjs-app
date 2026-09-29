import { useState } from "react";
import {
  Alert,
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

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 登入成功後回到設定頁(先把登入/註冊頁從導覽堆疊清掉)
  const goToSettings = () => {
    if (router.canDismiss()) router.dismissAll();
    router.replace("/(tabs)/settings");
  };

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password) {
      setError("請輸入帳號與密碼");
      return;
    }

    setLoading(true);
    try {
      const data = await postJson("/api/auth/login", {
        username: username.trim(),
        password,
      });

      if (data.success) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        goToSettings();
      } else {
        setError(data.message || "登入失敗,請再試一次");
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
          title: "登入",
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
          <Text style={styles.brandIcon}>🩺</Text>
          <Text style={styles.brandText}>My Doctor</Text>
        </View>
        <Text style={styles.subtitle}>使用現有帳號登入。</Text>

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
          onSubmitEditing={handleLogin}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryText}>{loading ? "登入中..." : "登入"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Alert.alert("忘記密碼", "此功能尚未開放。")}
        >
          <Text style={styles.linkText}>忘記密碼</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>還沒有帳戶?</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.linkText}>建立新帳戶</Text>
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
    gap: 8,
  },
  brandIcon: {
    fontSize: 30,
  },
  brandText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#d81f3f",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#5c5250",
    marginTop: 20,
    marginBottom: 28,
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
  error: {
    color: "#c62828",
    fontSize: 14,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2b1512",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 20,
  },
  linkText: {
    color: "#8a3a12",
    fontSize: 17,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  footerLabel: {
    color: "#5c5250",
    fontSize: 16,
  },
});