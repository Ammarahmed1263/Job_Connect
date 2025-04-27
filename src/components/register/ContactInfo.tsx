import { AppButton, AppText } from "@components/ui";
import ControlledLabelInput from "@components/ui/ControlledLabelInput";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { RegisterFormData } from "@type/auth";
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
  const { control, trigger } = useFormContext<RegisterFormData>();
  console.log('contact info rendered');

  const handlePrev = () => {
    setStep(1);
  };

  const handleNext = async () => {
    const isValid = await trigger('contact');
    console.log('is valid: ', isValid);
    if (isValid) setStep(3);
  };

  return (
    <View className="px-4 gap-4">
      <AppText>Contact Information</AppText>
      <ControlledLabelInput
        control={control}
        rules={authRules.email}
        name="contact.email"
        title="Email"
        placeholder="example@domain.com"
        inputMode="email"
        autoComplete="email"
        onSubmitEditing={() => focusRef(phoneRef)}
        submitBehavior="submit"
      >
        <Icon name="mail-outline" size={20} color={colors["--text-primary"]} />
      </ControlledLabelInput>

      <ControlledLabelInput
        ref={phoneRef}
        control={control}
        rules={authRules.phone}
        name="contact.phone"
        title="Phone"
        placeholder="01xxxxxxxxxx"
        keyboardType="phone-pad"
        autoComplete="tel"
        onSubmitEditing={() => focusRef(addressRef)}
        submitBehavior="submit"
      >
        <Icon name="call-outline" size={20} color={colors["--text-primary"]} />
      </ControlledLabelInput>

      <ControlledLabelInput
        ref={addressRef}
        control={control}
        rules={authRules.address}
        name="contact.address"
        title="Address"
        placeholder="Cairo, Egypt"
        autoComplete="street-address"
      >
        <Icon
          name="location-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </ControlledLabelInput>

      <View className="flex-row justify-between">
        <AppButton title="back" onPress={handlePrev} />
        <AppButton title="next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default ContactInfo;
