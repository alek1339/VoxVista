import { ButtonType } from "./ButtonTypes";

const Button: ButtonType = ({ text, onClick, className, disabled, type }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
