import { View, Text } from "react-native";
import React, { FC } from "react";
import {
  AppButton,
  AppIcon,
  AppText,
  ControlledLabelInput,
} from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import profileRules from "schemas/profile";
import { ExperienceForm } from "@type/profileFormTypes";
import { Control, UseFormClearErrors } from "react-hook-form";

interface ExperienceDetailsProps {
  control: Control<ExperienceForm>
  isEditing: boolean
  clearErrors: UseFormClearErrors<ExperienceForm>
  handleCancel: () => void
  handleSave: () => void
  handleEdit: () => void
}

const ExperienceDetails: FC<ExperienceDetailsProps> = ({
  control,
  isEditing,
  clearErrors,
  handleCancel,
  handleSave,
  handleEdit,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <AppText variant="medium" className="text-lg mb-2">
        Experience Details
      </AppText>
      <ControlledLabelInput
        title="Years Of Experience"
        control={control}
        clearErrors={clearErrors}
        name="yearsOfExperience"
        rules={profileRules.yearsOfExperience}
        placeholder="e.g. 5"
        editable={isEditing}
        leftComponent={({ focused }) => (
          <AppIcon
            name="calendar"
            size={24}
            color={
              focused || isEditing
                ? colors["--accent-color"]
                : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="Current or Desired Job"
        control={control}
        clearErrors={clearErrors}
        name="currentOrDesiredJob"
        placeholder="e.g. Software Engineer"
        editable={isEditing}
        leftComponent={({ focused }) => (
          <AppIcon
            name="case-outline"
            size={24}
            color={
              focused || isEditing
                ? colors["--accent-color"]
                : colors["--text-primary"]
            }
          />
        )}
      />
      <View className="flex-row gap-4 mt-2">
        {!isEditing ? (
          <AppButton
            title="Edit Experience"
            onPress={handleEdit}
            className="py-2 px-4"
            wrapperClassName="self-end"
          />
        ) : (
          <>
            <AppButton
              title="Save"
              onPress={handleSave}
              className="py-2 px-4"
            />
            <AppButton
              title="Cancel"
              onPress={handleCancel}
              flat
              className="py-2 px-4"
            />
          </>
        )}
      </View>
    </>
  );
};

export default ExperienceDetails;
