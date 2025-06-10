import { ThemeData } from "@type/theme";

type ThemeColorKey = keyof ThemeData;

interface StatusColorKeys {
  backgroundColorClass: ThemeColorKey;
  textColorClass: ThemeColorKey;
}

const statusColorSelector = (status: string | undefined): StatusColorKeys => {
  if (!status) {
    return {
      backgroundColorClass: "--card-color",
      textColorClass: "--text-muted",
    };
  }

  switch (status.toLowerCase()) {
    case "accepted":
      return {
        backgroundColorClass: "--success-color",
        textColorClass: "--success-color",
      };
    case "pending":
      return {
        backgroundColorClass: "--warning-color",
        textColorClass: "--warning-color",
      };
    case "rejected":
      return {
        backgroundColorClass: "--error-color",
        textColorClass: "--error-color",
      };
    default:
      return {
        backgroundColorClass: "--accent-color",
        textColorClass: "--accent-color",
      };
  }
};

export default statusColorSelector;
