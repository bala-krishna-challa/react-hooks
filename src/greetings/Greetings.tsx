import React, { ChangeEvent, useState } from 'react';
import RadioButtonGroup from '../components/RadioButtonGroup';
import { TXT_INITIAL, TXT_NAME } from '../constants';
import useLocalStorageState from '../hooks/useLocalStorageState';

type Person = {
  name: string;
};

interface Props {
  defaultName?: string;
}

const greetingOptions = [
  {
    label: 'Name',
    value: 'name',
    name: 'greeting-type',
  },
  {
    label: 'Initial',
    value: 'initial',
    name: 'greeting-type',
  },
];

const Greetings: React.FC<Props> = ({ defaultName = '' }) => {
  const [greetBy, setGreetBy] = useState(() => {
    return sessionStorage.getItem('initial') !== null ? 'initial' : 'name';
  });
  const [person, setPerson] = useLocalStorageState<Person>(greetBy, () => ({
    name: defaultName,
  }));

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPerson({ name: event.target.value });
  };

  const greetByChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setGreetBy(event.target.value);
  };

  const inputLabel = greetBy === 'name' ? TXT_NAME : TXT_INITIAL;

  return (
    <div>
      <RadioButtonGroup
        label="Greet by:"
        options={greetingOptions}
        onChange={greetByChangeHandler}
        selectedValue={greetBy}
      />
      <form>
        <label htmlFor="name">{inputLabel}</label>
        <input id="name" onChange={nameChangeHandler} value={person.name} />
      </form>
      <div>
        {person.name ? (
          <strong>Hello {person.name}</strong>
        ) : (
          `Please type your ${inputLabel}!`
        )}
      </div>
    </div>
  );
};

export default Greetings;
