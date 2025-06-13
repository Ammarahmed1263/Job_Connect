import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const shareResume = async (uri: string): Promise<void> => {
  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Downloaded", "Resume downloaded successfully.");
    }
  } catch (error) {
    console.error("Sharing error:", error);
    Alert.alert("Error", "Failed to share the resume.");
    throw error;
  }
};

export default shareResume;