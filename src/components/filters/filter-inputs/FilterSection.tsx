import { AppText } from '@components/ui';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  return (
    <View className="mb-6">
      <AppText variant="semiBold" className="mb-2 px-4 text-[--text-primary]">{title}</AppText>
      {children}
    </View>
  );
};

export default FilterSection;