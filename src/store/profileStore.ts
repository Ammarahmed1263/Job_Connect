import {
  ProfileSectionKey,
  profileSectionsFields,
} from "@constants/profileSections";
import { UserProfile } from "@type/userTypes";
import { countNonEmptyFields } from "@utils";
import { create } from "zustand";

interface ProfileStore {
  profile: Omit<UserProfile, "id">;
  totalFields: number;
  completedFields: number;
  setProfile: (profile: Omit<UserProfile, "id">) => void;
  updateField: <K extends keyof Omit<UserProfile, "id">>(
    field: K,
    value: Omit<UserProfile, "id">[K]
  ) => void;
  clearProfile: () => void;
  getSectionProgress: (section: ProfileSectionKey) => {
    completed: number;
    total: number;
    isComplete: boolean;
  };
}

const intialState: ProfileStore = {
  profile: {} as Omit<UserProfile, "id">,
  totalFields: 0,
  completedFields: 0,
  setProfile: () => {},
  updateField: () => {},
  clearProfile: () => {},
  getSectionProgress: () => ({ completed: 0, total: 0, isComplete: false }),
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...intialState,
  setProfile: (profile) =>
    set(() => ({
      profile,
      totalFields: Object.keys(profile).length,
      completedFields: countNonEmptyFields(profile),
    })),
  updateField: (field, value) =>
    set((state) => {
      const updatedProfile = { ...state.profile, [field]: value };
      return {
        profile: updatedProfile,
        completedFields: countNonEmptyFields(updatedProfile),
      };
    }),
  updateCompletionProgress: () => {
    const profile = get().profile;
    const completedCount = countNonEmptyFields(profile);
    set(() => ({ completedFields: completedCount }));
  },
  getSectionProgress: (section: ProfileSectionKey) => {
    const { profile } = get();
    const sectionFields = profileSectionsFields[section];

    if (!sectionFields) {
      return { completed: 0, total: 0, isComplete: true };
    }

    let completedCount = 0;

    const isFilled = (value: any): boolean => {
      return (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        (!Array.isArray(value) || value.length > 0) &&
        (typeof value !== "object" ||
          value === null ||
          Array.isArray(value) ||
          Object.keys(value).length > 0)
      );
    };

    if (
      section === "certifications" ||
      section === "skills" ||
      section === "resumes"
    ) {
      const sectionArray = profile[section as keyof Omit<UserProfile, "id">];
      if (isFilled(sectionArray)) {
        completedCount = sectionFields.length;
      } else {
        completedCount = 0;
      }
    } else {
      sectionFields.forEach((field) => {
        const value = profile[field as keyof Omit<UserProfile, "id">];
        if (isFilled(value)) {
          completedCount++;
        }
      });
    }

    return {
      completed: completedCount,
      total: sectionFields.length,
      isComplete: completedCount === sectionFields.length,
    };
  },
  clearProfile: () => set(() => ({
    profile: {} as Omit<UserProfile, "id">,
    totalFields: 0,
    completedFields: 0,
  })),
}));
