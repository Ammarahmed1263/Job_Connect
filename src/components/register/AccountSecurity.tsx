import { AppButton, AppText, LabelInput } from "@components/ui";
import { focusRef } from "@utils";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@contexts/ThemeContext";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const AccountSecurity: FC<Props> = ({ setStep }) => {
  const confirmPasswordRef = useRef<TextInput>(null);
  const { colors } = useTheme();

  return (
    <View className="px-4 gap-4">
      <AppText>Account Security</AppText>
      <LabelInput
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
      </LabelInput>
      <LabelInput
          ref={confirmPasswordRef}
          title="Confirm Password"
          placeholder="password"
          autoComplete="password"
          returnKeyType="done"
          secureTextEntry
        >
          <Icon name="lock-closed-outline" size={20} color={colors["--text-primary"]} />
        </LabelInput>
      <View className="flex-row justify-between">
        <AppButton title="back" onPress={() => setStep(3)} />
        <AppButton
          title="Register"
          onPress={() => console.log("i was clicked!")}
        />
      </View>
    </View>
  );
};

export default AccountSecurity;
