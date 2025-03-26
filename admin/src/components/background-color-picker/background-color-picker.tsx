import { FormControl, FormLabel, Select } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import { backgroundColors } from '@public/locales/sv/assistants.json';

export const BackgroundColorPicker: React.FC<{ property: string; label: string }> = ({ property, label }) => {
  const { register } = useFormContext();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select {...register(property)}>
        {Object.entries(backgroundColors).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
