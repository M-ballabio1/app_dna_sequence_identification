// ButtonComponent.tsx

import React, { ReactEventHandler } from 'react';

interface ButtonProps {
  onClick: ReactEventHandler;
  text: string;
  color: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick, text, color }) => {
  return (
    <button
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
