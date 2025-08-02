import { ControlledLabelInput } from '@components/ui';
import { Filters } from '@type/filterTypes';
import React from 'react';
import { Control, UseFormClearErrors } from 'react-hook-form';

interface LocationFilterProps {
  name: keyof Filters;
  control: Control<Filters>;
  clearErrors: UseFormClearErrors<Filters>
}

const LocationFilter: React.FC<LocationFilterProps> = ({ name, control, clearErrors }) => {

  return (
    <ControlledLabelInput
      control={control}
      clearErrors={clearErrors}
      name={name}
      placeholder="Cairo, Egypt"
      containerClassName="px-2 pt-2"
      title=''
    />
  );
};

export default LocationFilter;