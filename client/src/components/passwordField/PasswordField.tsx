import { PasswordFieldComponent } from "./PasswordFieldTypes";

const PasswordField: PasswordFieldComponent = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default PasswordField;
