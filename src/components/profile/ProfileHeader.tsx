import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { getStringInitials } from "@utils";
import CircularProgress from "@components/ui/CircularProgress";

interface ProfileHeaderProps {
  name: string;
  subtitle?: string;
  imageUri?: string;
  progress: number;
  onPress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  subtitle = "Complete Profile",
  imageUri,
  progress,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      className="bg-[--primary-300] flex-row items-center rounded-2xl px-6 py-5 mx-4 my-4 shadow-lg"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="mr-4">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center">
            <AppText className="text-[--text-primary] font-bold text-lg">
              {getStringInitials(name)}
            </AppText>
          </View>
        )}
      </View>

      <View className="flex-1">
        <AppText className="text-[--text-primary] mb-1">{name}</AppText>
        <AppText variant="light" className="text-white/80">
          {subtitle}
        </AppText>
      </View>

      <CircularProgress
        progress={progress}
        size={55}
        labelStyle={{
          fontFamily: "Montserrat-Bold",
        }}
        labelSize={14}
        strokeWidth={5}
        progressCircleColor={colors["--warning-color"]}
        outerCircleColor={colors["--card-color"]}
      />
    </TouchableOpacity>
  );
};

export default ProfileHeader;
