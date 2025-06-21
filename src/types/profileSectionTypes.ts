import { AppIcon } from "@components/ui";
import { ProfileSectionKey } from "@constants/profileSections";

export interface ProfileSection {
  id: string;
  sectionName: string;
  iconName: React.ComponentProps<typeof AppIcon>["name"];
  screen:
    | "contact-info"
    | "about-me"
    | "experience"
    | "education"
    | "certificates"
    | "skills"
    | "upload-resume";
  sectionValue: ProfileSectionKey;
}