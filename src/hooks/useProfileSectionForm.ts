import { useForm, DefaultValues } from "react-hook-form";
import { ProfileSectionKey, profileSectionsFields } from "@constants/profileSections";
import { useProfileStore } from "@store/profileStore";
import { UserProfile } from "@type/userTypes";
import { SectionFormTypes } from "@type/profileFormTypes";

const useProfileSectionForm = <K extends ProfileSectionKey>(
  section: K
) => {
  const profile = useProfileStore((state) => state.profile);

  const defaultValues = profileSectionsFields[section].reduce<Partial<SectionFormTypes[K]>>((acc, field) => {
    const key = field as keyof SectionFormTypes[K];
    const value = profile[field as keyof Omit<UserProfile, "id">]?.toString() as SectionFormTypes[K][typeof key];
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return useForm<SectionFormTypes[K]>({
    defaultValues: defaultValues as DefaultValues<SectionFormTypes[K]>,
  });
};

export default useProfileSectionForm;

