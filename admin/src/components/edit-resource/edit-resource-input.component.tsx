import { Input, FormControl, FormLabel, Switch, Select } from '@sk-web-gui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { backgroundColors } from '@utils/enums';

type InputProps = React.ComponentPropsWithoutRef<typeof Input.Component>;

interface EditResourceInputProps extends Omit<InputProps, 'ref' | 'key'> {
  label: string;
  property: any;
  index: number;
  required?: boolean;
}

export const EditResourceInput = React.forwardRef<HTMLInputElement, EditResourceInputProps>((props, ref) => {
  const { label, property, index, required, ...rest } = props;

  const { register, watch } = useFormContext();
  const data = watch(property);
  const type = typeof data;
  const isBackgroundColor = property === 'backgroundColor';
  return type === 'object' ?
      <></>
    : <FormControl required={required}>
        {isBackgroundColor ?
          <>
            <FormLabel>{label}</FormLabel>
            <Select {...register(property)}>
              {Object.entries(backgroundColors).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </Select>
          </>
        : type === 'boolean' ?
          <>
            <Switch {...register(property)} color="gronsta">
              {label}
            </Switch>
          </>
        : <>
            <FormLabel>{label}</FormLabel>
            <Input type={type === 'number' ? 'number' : 'text'} {...register(property)} {...rest} />
          </>
        }
      </FormControl>;
});
