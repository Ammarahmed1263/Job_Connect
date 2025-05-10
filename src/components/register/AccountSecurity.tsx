import { AppButton, AppText, ControlledLabelInput } from "@components/ui";
import { focusRef } from "@utils";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@contexts/ThemeContext";
import { RegisterFormData } from "@type/authTypes";
import { useFormContext } from "react-hook-form";
import authRules from "schemas/auth";
import { BaseSyntheticEvent } from "react";
import useAuthStore from "@store/authStore";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

const AccountSecurity: FC<Props> = ({ setStep, onSubmit }) => {
  const { colors } = useTheme();
  const { control, getValues } = useFormContext<RegisterFormData>();
  const { isLoading, error } = useAuthStore();
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
        autoFocus={true}
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
      {error && <AppText variant='light' className="pt-4 text-center color-[--error-color]">{error}</AppText>}
      <View className="flex-row justify-between pt-4">
        <AppButton title="back" onPress={handlePrev} disabled={isLoading} />
        <AppButton title="Register" onPress={onSubmit} disabled={isLoading}>
          {isLoading && (
            <View className="items-center justify-center">
              <AppText className="opacity-0 px-4 py-2">Register</AppText>
              <ActivityIndicator size="small" color={colors['--accent-color']} className="absolute"/>
            </View>
          )}
        </AppButton>
      </View>
    </View>
  );
};

export default AccountSecurity;
