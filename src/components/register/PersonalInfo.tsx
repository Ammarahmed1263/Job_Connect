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

const PersonalInfo: FC<Props> = ({ setStep }) => {
  const { colors } = useTheme();
  const lastNameRef = useRef<TextInput>(null);
  const { control, trigger } = useFormContext<RegisterFormData>();

  const handleNext = async () => {
    const isValid = await trigger(["personal.firstName", "personal.lastName"]);
    console.log("is valid: ", isValid);
    if (isValid) setStep(2);
  };

  return (
    <View className="px-4 gap-4">
      <AppText>Personal Information</AppText>

      <ControlledLabelInput
        control={control}
        rules={authRules.firstName}
        name="personal.firstName"
        title="First Name"
        placeholder="John"
        autoComplete="given-name"
        autoFocus={true}
        onSubmitEditing={() => focusRef(lastNameRef)}
        leftComponent={() => (
          <Icon
            name="person-outline"
            size={22}
            color={colors["--text-primary"]}
          />
        )}
      />

      <ControlledLabelInput
        ref={lastNameRef}
        control={control}
        rules={authRules.lastName}
        name="personal.lastName"
        title="Last Name"
        placeholder="Doe"
        autoComplete="family-name"
        leftComponent={() => (
          <Icon
            name="person-outline"
            size={22}
            color={colors["--text-primary"]}
          />
        )}
      />

      <AppButton title="next" onPress={handleNext} wrapperClassName="m-4" />
    </View>
  );
};

export default PersonalInfo;
