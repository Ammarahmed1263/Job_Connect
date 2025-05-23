import { AppText } from "@components/ui";
import { View } from "react-native";

const ReviewTab = () => {
  return (
    <View className="p-4">
      <AppText variant="medium" className="text-lg mb-2">Reviews</AppText>
      <AppText className="color-[--text-muted]">No reviews available yet.</AppText>
    </View>
  );
};

export default ReviewTab;