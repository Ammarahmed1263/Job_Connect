import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// import { CircularProgress } from "react-native-circular-progress-indicator";
import { AppText } from "@components/ui";

interface Props {
  name: string;
  imageUri?: string;
  progress: number;
  onPress?: () => void;
}

const ProfileCard = ({ name, imageUri, progress, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="bg-[--accent-color] flex-row items-center rounded-xl px-4 py-4 my-4 shadow-md"
      onPress={onPress}
    >
      {/* <Image
        source={imageUri ? { uri: imageUri } : undefined}
        className="w-12 h-12 rounded-full mr-4"
      /> */}
      <View className="w-12 h-12 rounded-full me-4 bg-[--bg-color] justify-center items-center">
        <AppText>
          {name?.split(" ")?.[0]?.[0]}
          {name?.split(" ")?.[1]?.[0]}
        </AppText>
      </View>
      <View className="flex-1">
        <Text className="text-white font-semibold text-base">{name}</Text>
        <Text className="text-gray-300 text-xs mt-1">View Profile</Text>
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
      <View className="rounded-full border-[--text-muted] border-2 w-12 h-12 items-center justify-center">
        <AppText>{progress}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
