import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

const handlePickDocument = async (mutateAsync: (asset: any) => Promise<void>) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      await mutateAsync(asset);
      Alert.alert("Success", "Resume uploaded successfully");
    }
  } catch (err) {
    console.error("Document Picker Error:", err);
    Alert.alert("Error", "Failed to upload resume");
  }
};

export default handlePickDocument;