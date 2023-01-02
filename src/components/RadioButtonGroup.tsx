import { ChangeEvent } from 'react';
import RadioButton from './RadioButton';

interface Option {
  label: string;
  value: string;
  name: string;
}

interface Props {
  label: string;
  selectedValue: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonGroup = ({
  label,
  selectedValue,
  options,
  onChange,
}: Props) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div>
        {options.map(({ label, name, value }) => {
          const shortenedOptionLabel = label.replace(/\s+/g, '');
          const optionId = `radio-option-${shortenedOptionLabel}`;

          return (
            <RadioButton
              key={optionId}
              value={value}
              label={label}
              id={optionId}
              name={name}
              checked={value === selectedValue}
              onChange={onChange}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
export default RadioButtonGroup;
