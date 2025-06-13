import { View, Text } from 'react-native'
import React from 'react'
import { AppIcon, ControlledLabelInput, NavigationHeader } from '@components/ui'
import { useProfileForm } from '@contexts/formContext';
import { ProfileFormData } from '@type/userTypes';
import { useUpdateSeekerProfile } from '@queries/userQueries';
import { useTheme } from '@contexts/ThemeContext';

const Education = () => {
  const {control} = useProfileForm();
  const { mutate } = useUpdateSeekerProfile();
  const { colors } = useTheme();

  const updateUserEducation = (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    mutate({
      ...data.contactInfo,
    });
  };

  return (
    <View>
      <NavigationHeader title="Education" />
      <ControlledLabelInput
          title="Education"
          control={control}
          name="education.education"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
      <ControlledLabelInput
          title="Degree"
          control={control}
          name="education.degree"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
      <ControlledLabelInput
          title="University"
          control={control}
          name="education.university"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
      <ControlledLabelInput
          title="College Name"
          control={control}
          name="education.collegeName"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
    </View>
  )
}

export default Education