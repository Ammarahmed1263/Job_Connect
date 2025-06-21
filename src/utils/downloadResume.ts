import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const downloadResume = async (resumeUrl: string, fileName: string): Promise<string> => {
  try {
    const downloadPath = FileSystem.documentDirectory + fileName;
    const { uri } = await FileSystem.downloadAsync(resumeUrl, downloadPath);
    console.log("File downloaded to:", uri);
    Alert.alert("Success", `Resume downloaded successfully to ${uri}`);
    return uri;
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert("Error", `Failed to download the resume. ${error}`);
    throw error;
  }
};

export default downloadResume;