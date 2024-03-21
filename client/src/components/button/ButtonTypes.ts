import React from "react";

export interface ButtonProps {
  text: string;
  onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  disabled?: boolean;
}

export type ButtonType = React.FC<ButtonProps>;
