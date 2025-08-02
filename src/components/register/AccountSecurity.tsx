import {
  AppButton,
  AppIcon,
  AppLoading,
  AppText,
  ControlledLabelInput,
} from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import useAuthStore from "@store/authStore";
import { RegisterFormData } from "@type/authTypes";
import { focusRef } from "@utils";
import React, { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { TextInput, View } from "react-native";
import authRules from "schemas/auth";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

const AccountSecurity: FC<Props> = ({ setStep, onSubmit }) => {
  const { colors } = useTheme();
  const { control, getValues, clearErrors } = useFormContext<RegisterFormData>();
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
        clearErrors={clearErrors}
        rules={authRules.password}
        name="account.password"
        title="Password"
        placeholder="password"
        autoComplete="password"
        autoFocus={true}
        submitBehavior="submit"
        onSubmitEditing={() => focusRef(confirmPasswordRef)}
        leftComponent={({ focused }) => (
          <Icon
            name="lock-open-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        rightComponent={({passwordVisible, focused}) => (
          <AppIcon
            name={passwordVisible ? "eye-outline" : "eye-closed"}
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        secureTextEntry
      ></ControlledLabelInput>

      <ControlledLabelInput
        ref={confirmPasswordRef}
        control={control}
        clearErrors={clearErrors}
        rules={authRules.confirmPassword(getValues)}
        name="account.confirmPassword"
        title="Confirm Password"
        placeholder="password"
        autoComplete="password"
        returnKeyType="done"
        leftComponent={({ focused }) => (
          <Icon
            name="lock-closed-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        rightComponent={({passwordVisible, focused}) => (
          <AppIcon
            name={passwordVisible ? "eye-outline" : "eye-closed"}
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        secureTextEntry
      />

      {error && (
        <AppText
          variant="light"
          className="pt-4 text-center color-[--error-color]"
        >
          {error}
        </AppText>
      )}
      <View className="flex-row justify-between m-4">
        <AppButton title="back" onPress={handlePrev} disabled={isLoading} />
        <AppButton title="Register" onPress={onSubmit} disabled={isLoading}>
          {isLoading && (
            <View className="items-center justify-center">
              <AppText className="opacity-0">Register</AppText>
              <AppLoading containerClassName="absolute"/>
            </View>
          )}
        </AppButton>
      </View>
    </View>
  );
};

export default AccountSecurity;
