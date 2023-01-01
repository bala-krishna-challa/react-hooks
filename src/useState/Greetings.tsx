import React, { ChangeEvent, useState } from 'react';

interface Props {
  defaultName?: string;
}

const Greetings: React.FC<Props> = ({ defaultName }) => {
  const [name, setName] = useState(defaultName || '');
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
