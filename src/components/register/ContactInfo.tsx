import { View, Text, TextInput } from "react-native";
import React, {
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@contexts/ThemeContext";
import { AppButton, AppText, LabelInput } from "@components/ui";
import { focusRef } from "@utils";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const ContactInfo: FC<Props> = ({ setStep }) => {
  const { colors } = useTheme();
  const address = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <View className="px-4 gap-4">
      <AppText>Contact Information</AppText>
      <LabelInput
        title="Email"
        placeholder="example@domain.com"
        inputMode="email"
        autoComplete="email"
        onSubmitEditing={() => focusRef(phoneRef)}
        submitBehavior="submit"
      >
        <Icon name="mail-outline" size={20} color={colors["--text-primary"]} />
      </LabelInput>

      <LabelInput
        ref={phoneRef}
        title="Phone"
        placeholder="01xxxxxxxxxx"
        keyboardType="phone-pad"
        autoComplete="tel"
        onSubmitEditing={() => focusRef(address)}
        submitBehavior="submit"
      >
        <Icon name="call-outline" size={20} color={colors["--text-primary"]} />
      </LabelInput>

      <LabelInput
        ref={address}
        title="Address"
        placeholder="Cairo, Egypt"
        autoComplete="street-address"
      >
        <Icon
          name="location-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </LabelInput>

      <View className="flex-row justify-between">
        <AppButton title="back" onPress={() => setStep(1)} />
        <AppButton title="next" onPress={() => setStep(3)} />
      </View>
    </View>
  );
};

export default ContactInfo;
