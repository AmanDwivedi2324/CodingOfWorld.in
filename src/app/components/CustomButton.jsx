import React from 'react';

const CustomButton = ({ text, className, ...props }) => {
  return (
    <button
      {...props} // Spreads all other props like type, disabled, and onClick
      // Merges default styles with custom styles passed via the className prop
      className={`w-full py-3 px-4 rounded-md text-white font-semibold transition duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;