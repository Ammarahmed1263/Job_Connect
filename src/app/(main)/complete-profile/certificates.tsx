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
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Certificates = () => {
  const { control, handleSubmit } = useProfileForm();
  const { mutateAsync } = useUpdateSeekerProfile();
  const { bottom } = useSafeArea();
  const router = useRouter();

  const updateUserCerts = async (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    await mutateAsync({
      ...data.contactInfo,
    });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Certs." />
      <ScrollView
        contentContainerClassName="gap-4 px-4 py-4"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="Certification Name"
          control={control}
          name="certifications"
        />
        <ControlledLabelInput
          title="Issue Date"
          control={control}
          name="certifications"
        />
        <ControlledLabelInput
          title="Issuing Organization"
          control={control}
          name="certifications"
        />
        <ControlledLabelInput
          title="Expiry Date (Optional)"
          control={control}
          name="certifications"
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
