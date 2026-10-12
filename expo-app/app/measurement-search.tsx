import { useMemo, useState } from "react";
import {
  Alert,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  ALL_MEASUREMENTS,
  COMMON_MEASUREMENTS,
  Measurement,
} from "@/constants/measurements";
import { startDraft } from "@/hooks/use-reminder-draft";

interface MeasurementSection {
  key: string;
  title: string;
  data: Measurement[];
}

// 用兩個 View 畫放大鏡,不用額外的圖示設定
function SearchIcon() {
  return (
    <View style={styles.iconWrap}>
      <View style={styles.iconCircle} />
      <View style={styles.iconHandle} />
    </View>
  );
}

export default function MeasurementSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const keyword = query.trim().toLowerCase();

  const sections = useMemo<MeasurementSection[]>(() => {
    if (keyword) {
      const results = [...COMMON_MEASUREMENTS, ...ALL_MEASUREMENTS].filter((m) =>
        m.name.toLowerCase().includes(keyword)
      );
      return [{ key: "results", title: "搜尋結果", data: results }];
    }
    return [
      { key: "common", title: "常見測量", data: COMMON_MEASUREMENTS },
      { key: "all", title: "所有測量", data: ALL_MEASUREMENTS },
    ];
  }, [keyword]);

  const noResults = keyword !== "" && sections[0].data.length === 0;

  // 選了測量項目 → 開一份新的提醒草稿,先問這個提醒是針對誰
  const openReminder = (measurement: Measurement) => {
    startDraft(measurement);
    router.push("/reminder-for");
  };

  // 自定義名稱:要先在搜尋列打好名稱
  const createCustom = () => {
    const name = query.trim();
    if (!name) {
      Alert.alert("自定義名稱", "請先在上方搜尋列輸入名稱,再點這裡建立。");
      return;
    }
    openReminder({ id: `custom-${Date.now()}`, name });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "搜尋",
          headerStyle: { backgroundColor: "#f6f2ef" },
          headerTintColor: "#2b1512",
        }}
      />
      <View style={styles.screen}>
        {/* 搜尋列 */}
        <View style={styles.searchArea}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="搜尋"
              placeholderTextColor="#8a817e"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              clearButtonMode="while-editing"
              style={styles.searchInput}
            />
          </View>
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <TouchableOpacity
                style={styles.customRow}
                onPress={createCustom}
              >
                <Text style={styles.customText}>
                  {keyword
                    ? `建立自定義名稱「${query.trim()}」`
                    : "點擊此處創建自定義名稱"}
                </Text>
              </TouchableOpacity>
              {noResults && <Text style={styles.emptyText}>找不到相符的測量項目</Text>}
            </View>
          }
          renderSectionHeader={({ section }) =>
            section.data.length === 0 ? null : (
              <View style={[styles.sectionHeader, section.key === "all" && styles.sectionDivider]}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemRow} onPress={() => openReminder(item)}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const INK = "#2b1512";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f2ef",
  },
  searchArea: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#dcd3ce",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e2ddda",
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: INK,
    paddingVertical: 0,
  },
  iconWrap: {
    width: 26,
    height: 26,
  },
  iconCircle: {
    position: "absolute",
    top: 1,
    left: 1,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2.5,
    borderColor: INK,
  },
  iconHandle: {
    position: "absolute",
    left: 16,
    top: 19,
    width: 9,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: INK,
    transform: [{ rotate: "45deg" }],
  },
  listContent: {
    paddingBottom: 40,
  },
  customRow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  customText: {
    fontSize: 17,
    color: "#8a3a12",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b6260",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionDivider: {
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#cfc6c1",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#6b6260",
  },
  itemRow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemText: {
    fontSize: 20,
    color: "#3a302e",
  },
});