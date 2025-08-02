import { useTheme } from "@contexts/ThemeContext";
import LottieView, {
  AnimationObject,
  LottieViewProps,
} from "lottie-react-native";
import { FC } from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface AppLoadingProps extends Omit<LottieViewProps, "source"> {
  size?: number;
  source?: string | AnimationObject | { uri: string };
  speed?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: ViewProps['className'];
  colors?: string[];
}

const AppLoading: FC<AppLoadingProps> = ({
  size = 40,
  source,
  speed = 1.5,
  style,
  containerStyle,
  containerClassName,
  colors: propColors,
  ...props
}) => {
  const { colors } = useTheme();

  const defaultColors = [
    colors["--primary-400"],
    colors["--primary-400"],
    colors["--primary-50"],
    colors["--primary-400"],
  ];

  const colorFilters = Array.from({ length: 4 }, (_, index) => ({
    keypath: `Capa ${index + 2} contornos`,
    color: propColors?.[index] || defaultColors[index],
  }));

  return (
    <View style={[styles.container, containerStyle]} className={containerClassName}>
      <LottieView
        style={[styles.loading, style, { width: size, height: size }]}
        source={source ?? require("@assets/lottie/loading.json")}
        speed={speed}
        autoPlay
        loop
        colorFilters={colorFilters}
        {...props}
      />
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    width: "100%",
    height: "100%",
    zIndex: 1000,
  },
});
