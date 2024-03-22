interface PasswordFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null;
}

export type PasswordFieldComponent = React.FC<PasswordFieldProps>;
