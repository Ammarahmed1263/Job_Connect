import { ThemeData } from "@type/theme";

type ThemeColorKey = keyof ThemeData;


const statusColorSelector = (status: string | undefined): ThemeColorKey => {
  if (!status) {
    return "--text-muted";
  }

  switch (status.toLowerCase()) {
    case "hired":
      return "--success-color";
    case "pending":
      return "--warning-color";
    case "rejected":
      return "--error-color";
    default:
      return "--accent-color";
  }
};

export default statusColorSelector;
