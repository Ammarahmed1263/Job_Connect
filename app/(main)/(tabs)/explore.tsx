import AppText from "@components/atoms/Text";
import { useTheme } from "@contexts/ThemeContext";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function TabTwoScreen() {
  const { theme, colors, setTheme } = useTheme();

  return (
    <View className="flex-1 mx-2 mt-4">
      <AppText className="text-[--text-secondary] text-2xl font-montserrat-bold">Preffered Theme: </AppText>
      <TouchableOpacity
        className="mx-3 my-2 p-4 border-[--accent-color] border-2 rounded-xl"
        onPress={() => setTheme("system")}
      >
        <AppText className="text-[--text-secondary] text-2xl">
          System theme
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className="mx-3 my-2 p-4 border-[--accent-color] border-2 rounded-xl"
        onPress={() => setTheme("light")}
      >
        <AppText className="text-[--text-secondary] text-2xl">
          Light theme
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className="mx-3 my-2 p-4 border-[--accent-color] border-2 rounded-xl"
        onPress={() => setTheme("dark")}
      >
        <AppText className="text-[--text-secondary] text-2xl">
          Dark theme
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
