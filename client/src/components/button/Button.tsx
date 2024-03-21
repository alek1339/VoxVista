import { ButtonType } from "./ButtonTypes";

const Button: ButtonType = ({ text, onClick, className, disabled }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
