import { useForm, DefaultValues } from "react-hook-form";
import {
  ProfileSectionKey,
  profileSectionsFields,
} from "@constants/profileSections";
import { useProfileStore } from "@store/profileStore";
import { UserProfile } from "@type/userTypes";
import { SectionFormTypes } from "@type/profileFormTypes";

const useProfileSectionForm = <K extends ProfileSectionKey>(
  section: K,
  additionalFields?: any
) => {
  const profile = useProfileStore((state) => state.profile);

  const defaultValues = profileSectionsFields[section].reduce<
    Partial<SectionFormTypes[K]>
  >((acc, field) => {
    const key = field as keyof SectionFormTypes[K];
    const value = profile[
      field as keyof Omit<UserProfile, "id">
    ]?.toString() as SectionFormTypes[K][typeof key];
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  let mergedDefaults = {
    ...defaultValues,
    ...additionalFields,
  };

  if (section === "skills" && profile.skills && Array.isArray(profile.skills)) {
    mergedDefaults = {
      ...mergedDefaults,
      skills: profile.skills ?? [],
    };
  }

  return useForm<SectionFormTypes[K]>({
    defaultValues: mergedDefaults as DefaultValues<SectionFormTypes[K]>,
    mode: "onBlur",
    reValidateMode: "onChange",
  });
};

export default useProfileSectionForm;
