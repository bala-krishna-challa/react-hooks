import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  defaultName?: string;
}

const getLazilyInitializedValue = (val: string) => {
  return sessionStorage.getItem('name') || val;
};

const Greetings: React.FC<Props> = ({ defaultName = '' }) => {
  const [name, setName] = useState(() =>
    getLazilyInitializedValue(defaultName)
  );

  useEffect(() => {
    sessionStorage.setItem('name', name);
  }, [name]);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" onChange={nameChangeHandler} value={name} />
      </form>
      <div>
        {name ? <strong>Hello {name}</strong> : 'Please type your name!'}
      </div>
    </div>
  );
};

export default Greetings;
