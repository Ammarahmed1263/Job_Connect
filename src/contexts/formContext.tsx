import { useProfileStore } from "@store/profileStore";
import { ProfileFormData } from "@type/userTypes";
import { convertProfileToFormData } from "@utils";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

const FormContext = createContext<UseFormReturn<ProfileFormData> | null>(null);

export const useProfileForm = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useProfileForm must be used within FormProvider");
  return context;
};

export const ProfileFormProvider = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfileStore();

  const methods = useForm<ProfileFormData>({
    defaultValues: convertProfileToFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      yearsOfExperience: 0,
      degree: "",
      currentOrDesiredJob: "",
      bio: "",
      coverLetter: "",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "",
      gender: "",
      education: "",
      university: "",
      portfolio: "",
      facebookLink: "",
      twitterLink: "",
      instagramLink: "",
      linkedInLink: "",
      collegeName: "",
      certifications: [],
      companyWorkedAt: [],
      skills: [],
      workedAs: [],
    }),
  });

  useEffect(() => {
    if (profile) {
      methods.reset(convertProfileToFormData(profile));
    }
  }, [profile]);

  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
};
