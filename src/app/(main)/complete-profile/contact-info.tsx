import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import {
  AppButton,
  AppIcon,
  AppText,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { useProfileForm } from "@contexts/formContext";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { ProfileFormData } from "@type/userTypes";
import { vs } from "@constants/metrics";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";

const ContactInfo = () => {
  // first name, last name, email, phone number, address, facebookLink, twitterLink, instagramLink, linkedinLink
  const { control, handleSubmit, formState } = useProfileForm();
  const { colors } = useTheme();
  const { bottom } = useSafeArea();
  const { mutate } = useUpdateSeekerProfile();
  console.log("form state: ", formState.defaultValues);

  const updateUserContact = (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    mutate({
      ...data.contactInfo,
    });
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Contact Info" />

      <ScrollView
        contentContainerClassName="gap-4 px-4 py-4"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="First Name (Read-only)"
          control={control}
          name="contactInfo.firstName"
          editable={false}
          leftComponent={() => (
            <AppIcon
              name="person-outline"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Last Name (Read-only)"
          control={control}
          name="contactInfo.lastName"
          editable={false}
          leftComponent={() => (
            <AppIcon
              name="person-outline"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Email (Read-only)"
          control={control}
          name="contactInfo.email"
          placeholder="example@domain.com"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          leftComponent={() => (
            <Icon
              name="mail-outline"
              size={22}
              color={colors["--text-primary"]}
            />
          )}
          editable={false}
        />
        <ControlledLabelInput
          title="Phone Number"
          control={control}
          name="contactInfo.phoneNumber"
          leftComponent={() => (
            <AppIcon
              name="person-outline"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Address"
          control={control}
          name="contactInfo.address"
          // leftComponent={() => (
          //   <AppIcon
          //     name="home-person"
          //     size={24}
          //     color={colors["--text-primary"]}
          //   />
          // )}
        />
        <ControlledLabelInput
          title="LinkedIn Link"
          control={control}
          name="contactInfo.linkedInLink"
          leftComponent={() => (
            <AppIcon
              name="linkedin"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Portfolio"
          control={control}
          name="contactInfo.portfolio"
          leftComponent={() => (
            <AppIcon
              name="linkedin"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Twitter Link"
          control={control}
          name="contactInfo.twitterLink"
          leftComponent={() => (
            <AppIcon
              name="twitter"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Instagram Link"
          control={control}
          name="contactInfo.instagramLink"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Facebook Link"
          control={control}
          name="contactInfo.facebookLink"
          leftComponent={() => (
            <AppIcon
              name="facebook"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <View style={styles.placeholder} />
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
  placeholder: {
    height: vs(80),
  },
});
