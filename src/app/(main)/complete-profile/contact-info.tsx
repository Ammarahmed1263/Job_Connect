import { ProfileSectionLayout } from "@components/complete-profile";
import {
  AppIcon,
  ControlledLabelInput,
  ControlledPhoneInput
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ContactInfoForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import profileRules from "schemas/profile";

const ContactInfo = () => {
  const { control, handleSubmit, formState, clearErrors } =
    useProfileSectionForm("contactInfo");
  const { colors } = useTheme();
  const { mutateAsync } = useUpdateSeekerProfile();
  console.log("form state: ", JSON.stringify(formState.defaultValues, null, 2));
  const router = useRouter();

  const updateUserContact = async (data: ContactInfoForm) => {
    console.log("data: ", data);
    await mutateAsync({
      ...data,
    });
    router.back();
  };

  return (
    <ProfileSectionLayout
      title="Contact"
      onSave={handleSubmit(updateUserContact)}
      contentContainerClassName="gap-4 px-4 py-4"
    >
        <ControlledLabelInput
          title="First Name (Read-only)"
          control={control}
          clearErrors={clearErrors}
          name="firstName"
          rules={profileRules.firstName}
          editable={false}
          leftComponent={({ focused }) => (
            <AppIcon
              name="person-outline"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Last Name (Read-only)"
          control={control}
          clearErrors={clearErrors}
          name="lastName"
          rules={profileRules.lastName}
          editable={false}
          leftComponent={({ focused }) => (
            <AppIcon
              name="person-outline"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Email (Read-only)"
          control={control}
          clearErrors={clearErrors}
          name="email"
          rules={profileRules.email}
          placeholder="example@domain.com"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          leftComponent={({ focused }) => (
            <AppIcon
              name="letter"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
          editable={false}
        />
        <ControlledPhoneInput
          title="Phone Number"
          placeholder="(123) 456-7890"
          control={control}
          clearErrors={clearErrors}
          name="phoneNumber"
        />
        <ControlledLabelInput
          title="Address"
          control={control}
          clearErrors={clearErrors}
          name="address"
          rules={profileRules.address}
          leftComponent={({ focused }) => (
            <AppIcon
              name="home-person"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Portfolio"
          control={control}
          clearErrors={clearErrors}
          name="portfolio"
          rules={profileRules.portfolio}
          placeholder="https://yourportfolio.com"
          leftComponent={({ focused }) => (
            <AppIcon
              name="user-circle"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="LinkedIn Link"
          control={control}
          clearErrors={clearErrors}
          name="linkedInLink"
          rules={profileRules.linkedInLink}
          placeholder="https://linkedin.com/in/username"
          leftComponent={({ focused }) => (
            <AppIcon
              name="linkedin"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Twitter Link"
          control={control}
          clearErrors={clearErrors}
          name="twitterLink"
          rules={profileRules.twitterLink}
          placeholder="https://twitter.com/username"
          leftComponent={({ focused }) => (
            <AppIcon
              name="twitter"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Instagram Link"
          control={control}
          clearErrors={clearErrors}
          name="instagramLink"
          rules={profileRules.instagramLink}
          placeholder="https://instagram.com/username"
          leftComponent={({ focused }) => (
            <AppIcon
              name="instagram"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
        <ControlledLabelInput
          title="Facebook Link"
          control={control}
          clearErrors={clearErrors}
          name="facebookLink"
          rules={profileRules.facebookLink}
          placeholder="https://facebook.com/username"
          leftComponent={({ focused }) => (
            <AppIcon
              name="facebook"
              size={24}
              color={
                focused ? colors["--accent-color"] : colors["--text-primary"]
              }
            />
          )}
        />
    </ProfileSectionLayout>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  saveButton: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: vs(14),
    borderRadius: vs(14),
  },
});
