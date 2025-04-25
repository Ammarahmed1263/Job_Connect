import { View, Text } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import { AppButton, AppText, LabelInput } from "@components/ui";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const ProfessionalInfo: FC<Props> = ({ setStep }) => {
  return (
    <View className="px-4 gap-4">
      <AppText>Professional Information</AppText>
      <LabelInput title="Job Title" placeholder="Software Engineer" />
      <LabelInput title="Years of Experience" placeholder="0+" />
      <LabelInput title="Degree" placeholder="Computer Science" />

      <View className="flex-row justify-between">
        <AppButton title="back" onPress={() => setStep(2)} />
        <AppButton title="next" onPress={() => setStep(4)} />
      </View>
    </View>
  );
};

export default ProfessionalInfo;
