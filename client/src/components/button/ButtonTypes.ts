import React from "react";

export interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export type ButtonType = React.FC<ButtonProps>;
