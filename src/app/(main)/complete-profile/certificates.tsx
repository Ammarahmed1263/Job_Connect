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
import { CertificationsForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Certificates = () => {
  const { control, handleSubmit } = useProfileSectionForm('certifications');
  const { mutateAsync } = useUpdateSeekerProfile();
  const { bottom } = useSafeArea();
  const router = useRouter();
  const { colors } = useTheme();

  const updateUserCerts = async (data: CertificationsForm) => {
    console.log("data: ", data);
    // await mutateAsync({
    //   ...data,
    // });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Certificates" />
      <ScrollView
        contentContainerClassName="gap-4 px-4 py-4"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="Certification Name"
          control={control}
          name="certificationName"
          leftComponent={() => (
            <AppIcon
              name="diploma"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Issue Date"
          control={control}
          name="issueDate"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
        <ControlledLabelInput
          title="Issuing Organization"
          control={control}
          name="issuingOrganization"
          leftComponent={() => (
            <AppIcon
            name="city"
            size={24}
            color={colors["--text-primary"]}
            />
          )}
          />
        <ControlledLabelInput
          title="Expiry Date (Optional)"
          control={control}
          name="expiryDate"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
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
          onPress={handleSubmit(updateUserCerts)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
      </View>
    </View>
  );
};

export default Certificates;

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
