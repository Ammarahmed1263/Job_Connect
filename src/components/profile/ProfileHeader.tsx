import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { getStringInitials } from "@utils";
// import { CircularProgress } from "react-native-circular-progress-indicator";

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
      {/* Profile Image or Initials */}
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

      {/* User Info */}
      <View className="flex-1">
        <AppText className="text-[--text-primary] mb-1">{name}</AppText>
        <AppText variant="light" className="text-white/80">{subtitle}</AppText>
      </View>

      {/* Progress Circle */}
      <View className="relative">
        <View className="w-16 h-16 rounded-full border-4 border-white/30 justify-center items-center">
          <View
            className="absolute inset-0 rounded-full border-4 border-yellow-400"
            style={{
              transform: [{ rotate: "-90deg" }],
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: progress > 50 ? "#FBBF24" : "transparent",
              borderLeftColor: "#FBBF24",
            }}
          />
          <AppText className="text-white font-bold text-sm">
            {progress}%
          </AppText>
        </View>
      </View>
      {/* <CircularProgress
        value={progress}
        radius={25}
        duration={1000}
        progressValueColor="#fff"
        activeStrokeColor="#FFD700"
        inActiveStrokeColor="#FFFFFF"
        inActiveStrokeOpacity={0.2}
        maxValue={100}
      /> */}
    </TouchableOpacity>
  );
};

export default ProfileHeader;
