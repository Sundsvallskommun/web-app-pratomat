import { FormControl, FormLabel, Select } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const BackgroundColorPicker: React.FC<{ property: string; label: string }> = ({ property, label }) => {
  const { register } = useFormContext();
  const { t } = useTranslation();

  const backgroundColorKeys = ['vattjom', 'gronsta', 'bjornstigen', 'juniskar'];

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select {...register(property)}>
        {backgroundColorKeys.map((key) => (
          <option key={key} value={key}>
            {t(`assistants:backgroundColors.${key}`)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
