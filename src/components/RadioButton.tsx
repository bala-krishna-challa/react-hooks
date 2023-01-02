import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const RadioButton: React.FC<Props> = ({ label, id, ...rest }) => {
  return (
    <div>
      <input type="radio" id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
