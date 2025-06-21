import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { AboutForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const AboutMe = () => {
  const { control, handleSubmit, formState } = useProfileSectionForm("about");
  const { bottom } = useSafeArea();
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
  const { colors } = useTheme();

  console.log("form data: ", formState.defaultValues);

  const updateUserAbout = async (data: AboutForm) => {
    console.log("data: ", data);
    await mutateAsync({
      ...data,
    });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="About Me" />

      <ScrollView
        contentContainerClassName="gap-4 px-2 pt-4"
        contentContainerStyle={{
          paddingBottom: bottom + vs(112),
        }}
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="Bio"
          control={control}
          name="bio"
          multiline={true}
          numberOfLines={3}
          pressableClassName="!items-start"
          style={{
            minHeight: vs(100),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="user-id"
              size={28}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        />
        {/* <ControlledLabelInput
          title="Cover Letter"
          control={control}
          name="coverLetter"
          multiline={true}
          numberOfLines={6}
          pressableClassName="!items-start"
          style={{
            minHeight: vs(150),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="clipboard"
              size={24}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        /> */}
        <ControlledLabelInput
          title="Cover Letter"
          control={control}
          name="coverLetter"
          multiline={true}
          numberOfLines={6}
          pressableClassName="!items-start"
          style={{
            minHeight: vs(150),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="clipboard"
              size={24}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        />
        <ControlledLabelInput
          title="Birth Date"
          control={control}
          name="dateOfBirth"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Nationality"
          control={control}
          name="nationality"
          leftComponent={() => (
            <AppIcon name="city" size={24} color={colors["--text-primary"]} />
          )}
        />
        <ControlledLabelInput
          title="Marital Status"
          control={control}
          name="maritalStatus"
          leftComponent={() => (
            <AppIcon name="ring" size={24} color={colors["--text-primary"]} />
          )}
        />
        <ControlledLabelInput
          title="gender"
          control={control}
          name="gender"
          leftComponent={() => (
            <AppIcon name="family" size={34} color={colors["--text-primary"]} />
          )}
        />
      </ScrollView>

      <View
        className="absolute px-4 bg-[--card-color] shadow-lg"
        style={{
          ...styles.saveButton,
          paddingBottom: bottom + vs(20),
        }}
      >
        <AppButton
          title="Save"
          onPress={handleSubmit(updateUserAbout)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
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
    borderRadius: vs(14),
  },
  placeholder: {
    height: vs(60),
  },
});
