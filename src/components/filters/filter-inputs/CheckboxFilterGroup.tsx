import { AppText } from '@components/ui';
import { useTheme } from '@contexts/ThemeContext';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Filters } from '@type/filterTypes';
import Ionicons from '@expo/vector-icons/Ionicons'; // For checkbox icon
import { clsx } from 'clsx';

type CheckboxOption = {
  label: string;
  value: string; 
};

interface CheckboxFilterGroupProps {
  name: keyof Filters; // This will likely be 'title' or a similar field that can accept multiple values or a specific string
  control: Control<Filters>;
  options: CheckboxOption[];
}

const CheckboxFilterGroup: React.FC<CheckboxFilterGroupProps> = ({ name, control, options }) => {
  const { colors } = useTheme();

  return (
    <Controller
      control={control}
      name={name} // Assuming 'title' filter can be a single selected job title string
      render={({ field: { onChange, value } }) => (
        <View>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => onChange(isSelected ? '' : option.value)} // Toggle selection, or clear if already selected
                className="flex-row items-center mb-3 p-2 rounded-lg"
              >
                <View 
                  className={clsx(
                      'w-6 h-6 border-2 rounded mr-3 flex items-center justify-center',
                      isSelected ? 'bg-[--accent-color] border-[--accent-color]' : 'border-[--text-secondary]'
                  )}
                >
                  {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                <AppText className="text-[--text-primary]">{option.label}</AppText>
              </Pressable>
            );
          })}
        </View>
      )}
    />
  );
};

export default CheckboxFilterGroup;