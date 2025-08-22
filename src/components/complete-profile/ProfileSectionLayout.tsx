import { AppButton, NavigationHeader, SubmitButton } from "@components/ui";
import { vs } from "@constants/metrics";
import { useSafeArea } from "@hooks/useSafeArea";
import clsx from "clsx";
import React, { ReactNode } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ProfileSectionLayoutProps {
  title: string;
  children: ReactNode;
  showSaveButton?: boolean;
  onSave?: () => void;
  saveButtonTitle?: string;
  contentContainerClassName?: string;
  onBackPress?: () => void;
  isLoading: boolean
}

const ProfileSectionLayout = ({
  title,
  children,
  showSaveButton = true,
  onSave,
  saveButtonTitle = "Save",
  contentContainerClassName = "gap-4 px-4 pt-4",
  onBackPress,
  isLoading
}: ProfileSectionLayoutProps) => {
  const { bottom } = useSafeArea();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex-1">
        <NavigationHeader title={title} onBackPress={onBackPress} />

        <ScrollView
          contentContainerClassName={contentContainerClassName}
          contentContainerStyle={{
            paddingBottom: bottom + (showSaveButton ? vs(112) : vs(20)),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {showSaveButton && onSave && (
          <View
            className="absolute px-4 bg-[--card-color] shadow-lg"
            style={{
              ...styles.saveButton,
              paddingBottom: bottom + vs(20),
            }}
          >
            <SubmitButton
              title={saveButtonTitle}
              onPress={onSave}
              className="py-2"
              wrapperClassName="mx-2"
              disabled={isLoading}
              disableShadow={isLoading}
              isLoading={isLoading}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileSectionLayout;

const styles = StyleSheet.create({
  saveButton: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: vs(14),
    borderRadius: vs(14),
  },
});
