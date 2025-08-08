import Constants from "expo-constants";
import { Alert, Platform, Share } from "react-native";

interface ShareJobParams {
  jobId: number;
  jobTitle: string;
  companyName?: string;
}

const shareJob = async ({
  jobId,
  jobTitle,
  companyName,
}: ShareJobParams): Promise<void> => {
  try {
    const scheme = Constants.expoConfig?.scheme || "myapp";

    const deepLink = `${scheme}://jobs/${jobId}`;

    const appStoreLink = Platform.select({
      ios: "https://apps.apple.com",
      android:
        "https://play.google.com/store",
      default: "https://github.com/Ammarahmed1263",
    });

    const title = `Job Opportunity: ${jobTitle}`;
    const message = `Check out this job opportunity${
      companyName ? ` at ${companyName}` : ""
    }! \n\nOpen in Job Connect app: ${deepLink}\n\nDon't have the app? Download it here: ${appStoreLink}`;

    await Share.share(
      {
        title,
        message,
        url: deepLink,
      },
      {
        dialogTitle: "Share Job Opportunity",
        subject: title,
      }
    );
  } catch (error) {
    console.error("Sharing error:", error);
    Alert.alert("Error", "Failed to share the job.");
    throw error;
  }
};

export default shareJob;
