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

const ContactInfo: FC<Props> = ({ setStep }) => {
  const { colors } = useTheme();
  const addressRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const { control, trigger, clearErrors } = useFormContext<RegisterFormData>();
  console.log("contact info rendered");

  const handlePrev = () => {
    setStep(1);
  };

  const handleNext = async () => {
    const isValid = await trigger([
      "contact.email",
      "contact.phone",
      "contact.address",
    ]);
    console.log("is valid: ", isValid);
    if (isValid) setStep(3);
  };

  return (
    <View className="px-4 gap-4">
      <AppText>Contact Information</AppText>
      <ControlledLabelInput
        control={control}
        clearErrors={clearErrors}
        rules={authRules.email}
        name="contact.email"
        title="Email"
        placeholder="example@domain.com"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onSubmitEditing={() => focusRef(phoneRef)}
        leftComponent={({ focused }) => (
          <Icon
            name="mail-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        submitBehavior="submit"
      />

      <ControlledLabelInput
        ref={phoneRef}
        control={control}
        clearErrors={clearErrors}
        rules={authRules.phone}
        name="contact.phone"
        title="Phone"
        placeholder="01xxxxxxxxxx"
        keyboardType="phone-pad"
        autoComplete="tel"
        onSubmitEditing={() => focusRef(addressRef)}
        leftComponent={({ focused }) => (
          <Icon
            name="call-outline"
            size={22}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
        submitBehavior="submit"
      />

      <ControlledLabelInput
        ref={addressRef}
        control={control}
        clearErrors={clearErrors}
        rules={authRules.address}
        name="contact.address"
        title="Address"
        placeholder="Cairo, Egypt"
        autoComplete="street-address"
        leftComponent={({ focused }) => (
          <Icon
            name="home-outline"
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

export default ContactInfo;
