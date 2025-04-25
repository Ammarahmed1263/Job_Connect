import { AppButton, AppText, LabelInput } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import Icon from '@expo/vector-icons/Ionicons';
import { focusRef } from "@utils";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { TextInput, View } from "react-native";

interface Props {
  setStep: Dispatch<SetStateAction<number>>
}

const PersonalInfo: FC<Props> = ({setStep}) => {
  const { colors } = useTheme();
  const lastNameRef = useRef<TextInput>(null);

  return (
    <View className="px-4 gap-4">
      <AppText>Personal Information</AppText>

      <LabelInput
        title="First Name"
        placeholder="John"
        autoComplete="given-name"
        onSubmitEditing={() => focusRef(lastNameRef)}
      >
        <Icon
          name="person-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </LabelInput>

      <LabelInput
        ref={lastNameRef}
        title="Last Name"
        placeholder="Doe"
        touched={true}
        autoComplete="family-name"
      >
        <Icon
          name="person-outline"
          size={20}
          color={colors["--text-primary"]}
        />
      </LabelInput>

      <AppButton
        title="next"
        onPress={() => setStep(2)}
        wrapperClassName="self-end"
      />
    </View>
  );
};

export default PersonalInfo;
