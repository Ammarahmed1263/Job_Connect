import {
  AppButton,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useProfileForm } from "@contexts/formContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ProfileFormData } from "@type/userTypes";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

const AboutMe = () => {
  // about me: bio, coverLetter, dateOfBirth, nationality, maritalStatus, gender
  const { control, handleSubmit, formState } = useProfileForm();
  const { bottom } = useSafeArea();
  const { mutate } = useUpdateSeekerProfile();

  console.log("form data: ", formState.defaultValues);

  const updateUserAbout = (data: ProfileFormData) => {
    console.log("data: ", data.about);
    mutate({
      ...data.about,
    });
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="About Me" />
      <ScrollView className="mx-2 gap-4">
        <ControlledLabelInput
          title="Bio"
          control={control}
          name="about.bio"
          multiline={true}
          numberOfLines={5}
          style={{
            height: vs(150),
            textAlignVertical: "top",
          }}
        />
        <ControlledLabelInput
          title="Cover Letter"
          control={control}
          name="about.coverLetter"
        />
        <ControlledLabelInput
          title="Birth Date"
          control={control}
          name="about.dateOfBirth"
        />
        <ControlledLabelInput
          title="Nationality"
          control={control}
          name="about.nationality"
        />
        <ControlledLabelInput
          title="Marital Status"
          control={control}
          name="about.maritalStatus"
        />
        <ControlledLabelInput
          title="gender"
          control={control}
          name="about.gender"
        />
      </ScrollView>

      <View
        className="absolute px-4 bg-[--card-color] shadow-lg"
        style={{
          ...styles.saveButton,
          paddingBottom: bottom + vs(20),
        }}
      >
        <AppButton title="Save" onPress={handleSubmit(updateUserAbout)} className="py-2" wrapperClassName="!rounded-full mx-2"/>
      </View>
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  saveButton: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: vs(14),
    borderRadius: vs(14)
  },
  placeholder: {
    height: vs(60),
  },
});
