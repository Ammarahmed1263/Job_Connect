import { AppButton, AppText } from "@components/ui";
import { useWithAuth } from "@hooks/useWithAuth";
import React from "react";
import { View } from "react-native";

export default function saved() {
  const { requireAuth } = useWithAuth();

  const handleSaveJob = () => {
    if (!requireAuth()) return;
    console.log("save job");
  };

  return (
    <View>
      <AppText>saved</AppText>
      <AppButton title="save job" onPress={handleSaveJob} wrapperClassName="self-center"/>
    </View>
  );
}
