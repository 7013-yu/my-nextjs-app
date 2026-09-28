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

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 登入成功後回到設定頁 (清空歷史堆疊)
  const goToSettings = () => {
    if (router.canDismiss()) router.dismissAll();
    router.replace("/(tabs)/settings");
  };

  const handleLogin = async () => {
    setMessage("");
    const account = username.trim();

    if (!account) {
      setMessage("請輸入帳號");
      return;
    }
    if (!password) {
      setMessage("請輸入密碼");
      return;
    }

    setLoading(true);
    try {
      const data = await postJson("/api/auth/login", {
        username: account,
        password,
      });

      if (data.success) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setMessage("登入成功！");
        setTimeout(() => goToSettings(), 500);
      } else {
        setMessage(data.message || "登入失敗，請檢查帳號密碼");
      }
    } catch (err) {
      setMessage(describeNetworkError(err));
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
          <Text style={styles.brandIcon}>💊</Text>
          <Text style={styles.brandText}>MyTherapy</Text>
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

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? "登入中..." : "登入"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => {
            /* 忘記密碼邏輯或頁面導向 */
          }}
        >
          <Text style={styles.forgotText}>忘記密碼</Text>
        </TouchableOpacity>
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
  message: {
    color: "#c62828",
    fontSize: 14,
    marginBottom: 12,
    marginHorizontal: 4,
    textAlign: "center",
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#220f0d",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  forgotButton: {
    marginTop: 24,
    alignItems: "center",
  },
  forgotText: {
    color: "#2b1512",
    fontSize: 17,
    fontWeight: "600",
  },
});