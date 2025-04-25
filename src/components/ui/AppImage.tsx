import clsx from "clsx";
import { Image as ExpoImage, ImageProps, ImageSource } from "expo-image";
import { FC, useMemo, useState } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
// import {imagePlaceHolder} from '../../constants';
// import AppLoading from './AppLoading';

interface AppImageProps extends Omit<ImageProps, "source"> {
  source?: ImageSource;
  placeholder?: "movie" | "person";
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ImageStyle>;
  loadingSize?: "small" | "large";
}

const AppImage: FC<AppImageProps> = ({
  source,
  placeholder = "movie",
  loadingSize = "large",
  containerStyle,
  style,
  onLoadEnd,
  ...props
}) => {
  // const imageHolder =
  //   placeholder === 'movie' ? imagePlaceHolder.MOVIE : imagePlaceHolder.PERSON;
  const [isLoading, setIsLoading] = useState(true);
  const imageHolder = null;
  const isRemote = source && typeof source === "string";

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd?.();
  };

  const imageStyle = useMemo(
    () => [styles.image, style, isLoading && { opacity: 0 }],
    [style, isLoading]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {/* {isLoading && (
        <AppLoading
          size={loadingSize === 'small' ? hs(25) : hs(35)}
          speed={2}
          source={require('../../assets/lottie/loading_fade.json')}
        />
      )} */}
      <ExpoImage
        source={source ?? imageHolder}
        style={imageStyle}
        onLoadEnd={handleLoadEnd}
        contentFit="cover"
        cachePolicy={isRemote ? "memory-disk" : "none"}
        transition={300}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
  },
});

export default AppImage;
