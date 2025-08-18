import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Certification } from "@type/userTypes";
import React from "react";
import { View } from "react-native";

type CertificateItemProps = {
  item: Certification;
  index: number;
  onEdit: (certificate: Certification) => void;
  onDelete: (certificate: Certification) => void;
};

const CertificateItem = ({ item, index, onEdit, onDelete }: CertificateItemProps) => {
  const { colors } = useTheme();
  console.log('item here: ', item);

  return (
    <View className="p-4 mb-3 border border-[--border-color] rounded-lg bg-[--card-color]">
      <View className="flex-row justify-between items-center mb-2">
        <AppText variant="medium" className="flex-1">
          {index + 1}. {item.certificationName}
        </AppText>
        <View className="flex-row gap-2">
          <AppButton
            title=""
            flat
            wrapperClassName="!rounded-lg"
            className="!bg-[--border-color]/40 p-2"
            onPress={() => onEdit(item)}
          >
            <AppIcon name="pen-round" size={20} color={colors["--accent-color"]} />
          </AppButton>

          <AppButton
            title=""
            flat
            wrapperClassName="!rounded-lg"
            className="!bg-[--border-color]/40 p-2"
            onPress={() => onDelete(item)}
          >
            <AppIcon name="trash-bin" size={20} color={colors["--error-color"]} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

export default CertificateItem;