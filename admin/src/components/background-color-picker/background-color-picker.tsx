import { FormControl, FormLabel, Select } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';

export const BackgroundColorSelect: React.FC<{ property: string; label: string; options: Record<string, string> }> = ({
  property,
  label,
  options,
}) => {
  const { register } = useFormContext();

  return (
    <FormControl>
      <FormLabel htmlFor={property}>{label}</FormLabel>
      <Select id={property} {...register(property)}>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
