import React from "react";

type typeInput = "text" | "password" | "email";
interface InputProps {
  type: typeInput;
  placeholder: string;
  value: string;
  className?: string;
  style: React.CSSProperties;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  style,
  className,
  onBlur,
}) => {
  return (
    <input
      type={type}
      style={style}
      className={className}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default Input;
