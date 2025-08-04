import React from "react";

const CustomInput = ({
  type,
  placeholder,
  onChange,
  onBlur,
  name,
  value,
  icon: Icon,
  error,
}) => {
  return (
    <div className="mt-6">
      <div className="relative">
        {Icon && (
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
            <Icon />
          </span>
        )}
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full p-2 border rounded-lg transition-all duration-200 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1 pl-1">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
