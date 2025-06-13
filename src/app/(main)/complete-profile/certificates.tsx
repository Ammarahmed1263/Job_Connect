import { View, Text } from 'react-native'
import React from 'react'
import { ControlledLabelInput, NavigationHeader } from '@components/ui'
import { useProfileForm } from '@contexts/formContext'
import { ProfileFormData } from '@type/userTypes'
import { useUpdateSeekerProfile } from '@queries/userQueries'

const Certificates = () => {
  const {control} = useProfileForm();
  const { mutate } = useUpdateSeekerProfile();
  
  const updateUserCerts = (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    mutate({
      ...data.contactInfo,
    });
  };

  return (
    <View>
      <NavigationHeader title="Certs." />
      <ControlledLabelInput
          title="Certification Name"
          control={control}
          name="certifications"
        />
      <ControlledLabelInput
          title="Issue Date"
          control={control}
          name="certifications"
        />
      <ControlledLabelInput
          title="Issuing Organization"
          control={control}
          name="certifications"
        />
      <ControlledLabelInput
          title="Expiry Date (Optional)"
          control={control}
          name="certifications"
        />
    </View>
  )
}

export default Certificates