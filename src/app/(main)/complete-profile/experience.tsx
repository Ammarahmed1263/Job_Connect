import { View, Text } from "react-native";
import React from "react";
import { ControlledLabelInput, NavigationHeader } from "@components/ui";
import { useProfileForm } from "@contexts/formContext";
import { ProfileFormData } from "@type/userTypes";
import { useUpdateSeekerProfile } from "@queries/userQueries";

const Experience = () => {
  // yearsOfExperience, currentOrDesiredJob, companyWorkedAt, workedAs
  const { control, handleSubmit } = useProfileForm();
  const { mutate } = useUpdateSeekerProfile();

  const updateUserExperience = (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    mutate({
      ...data.contactInfo,
    });
  };

  return (
    <>
      <NavigationHeader title="Experience" />
      <View className="mx-2 gap-4">
        <ControlledLabelInput
          title="Years Of Experience"
          control={control}
          name="experience.yearsOfExperience"
        />
        <ControlledLabelInput
          title="Current or Desired"
          control={control}
          name="experience.currentOrDesiredJob"
        />
        <ControlledLabelInput
          title="Company"
          control={control}
          name="experience.companyWorkedAt"
        />
        <ControlledLabelInput
          title="Title"
          control={control}
          name="experience.workedAs"
        />
      </View>
    </>
  );
};

export default Experience;
