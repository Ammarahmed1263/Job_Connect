import { AppButton, AppText, LabelInput } from "@components/ui";
import { focusRef } from "@utils";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@contexts/ThemeContext";
import { RegisterFormData } from "@type/auth";
import { useFormContext } from "react-hook-form";
import authRules from "schemas/auth";
import ControlledLabelInput from "@components/ui/ControlledLabelInput";
import { BaseSyntheticEvent } from "react";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

const AccountSecurity: FC<Props> = ({ setStep, onSubmit }) => {
  const { colors } = useTheme();
  const { control, getValues } = useFormContext<RegisterFormData>();
  const confirmPasswordRef = useRef<TextInput>(null);
  console.log("account info rendered");

  const handlePrev = () => {
    setStep(3);
  };

  return (
    <View className="px-4 gap-4">
      <AppText>Account Security</AppText>

      <ControlledLabelInput
        control={control}
        rules={authRules.password}
        name="account.password"
        title="Password"
        placeholder="password"
        autoComplete="password"
        submitBehavior="submit"
        onSubmitEditing={() => focusRef(confirmPasswordRef)}
        secureTextEntry
      >
        <Icon
          name="lock-open-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </ControlledLabelInput>

      <ControlledLabelInput
        ref={confirmPasswordRef}
        control={control}
        rules={authRules.confirmPassword(getValues)}
        name="account.confirmPassword"
        title="Confirm Password"
        placeholder="password"
        autoComplete="password"
        returnKeyType="done"
        secureTextEntry
      >
        <Icon
          name="lock-closed-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </ControlledLabelInput>
      <View className="flex-row justify-between">
        <AppButton title="back" onPress={handlePrev} />
        <AppButton title="Register" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default AccountSecurity;
