import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  ControlledPhoneInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ContactInfoForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ContactInfo = () => {
  const { control, handleSubmit, formState, clearErrors } =
    useProfileSectionForm("contactInfo");
  const { colors } = useTheme();
  const { bottom } = useSafeArea();
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
    <View className="flex-1">
      <NavigationHeader title="Contact Info" />

      <ScrollView
        contentContainerClassName="gap-4 px-4 pt-4"
        contentContainerStyle={{
          paddingBottom: bottom + vs(112),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ControlledLabelInput
          title="First Name (Read-only)"
          control={control}
          clearErrors={clearErrors}
          name="firstName"
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
          onPress={handleSubmit(updateUserContact)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
      </View>
    </View>
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
