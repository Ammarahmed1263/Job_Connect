import { AppButton, AppText, ControlledLabelInput } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { RegisterFormData } from "@type/authTypes";
import { focusRef } from "@utils";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { TextInput, View } from "react-native";
import authRules from "schemas/auth";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const ProfessionalInfo: FC<Props> = ({ setStep }) => {
  const { colors } = useTheme();
  const { control, trigger, clearErrors } = useFormContext<RegisterFormData>();
  const experienceRef = useRef<TextInput>(null);
  const degreeRef = useRef<TextInput>(null);
  console.log("professional info rendered");

  const handlePrev = () => {
    setStep(2);
  };

  const handleNext = async () => {
    const isValid = await trigger([
      "professional.jobTitle",
      "professional.experience",
      "professional.degree",
    ]);
    console.log("is valid: ", isValid);
    if (isValid) setStep(4);
  };

  return (
    <View className="px-4 gap-4">
      <AppText>Professional Information</AppText>

      <ControlledLabelInput
        control={control}
        clearErrors={clearErrors}
        rules={authRules.jobTitle}
        name="professional.jobTitle"
        title="Job Title"
        placeholder="Software Engineer"
        autoFocus={true}
        submitBehavior="submit"
        onSubmitEditing={() => focusRef(experienceRef)}
        leftComponent={({ focused }) => (
          <Icon
            name="briefcase-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />

      <ControlledLabelInput
        ref={experienceRef}
        control={control}
        clearErrors={clearErrors}
        rules={authRules.experience}
        name="professional.experience"
        title="Years of Experience"
        placeholder="0+"
        submitBehavior="submit"
        onSubmitEditing={() => focusRef(degreeRef)}
        leftComponent={({ focused }) => (
          <Icon
            name="calendar-number-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />

      <ControlledLabelInput
        ref={degreeRef}
        control={control}
        clearErrors={clearErrors}
        rules={authRules.degree}
        name="professional.degree"
        title="Degree"
        placeholder="Computer Science"
        leftComponent={({ focused }) => (
          <Icon
            name="business-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />

      <View className="flex-row justify-between mt-4">
        <AppButton title="back" onPress={handlePrev} />
        <AppButton title="next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default ProfessionalInfo;
