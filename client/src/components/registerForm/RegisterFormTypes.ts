import React from "react";

export interface RegisterFormProps {}

export interface RegisterState {
    username: string;
    password: string;
    confirmPassword: string;
}

export type RegisterFormComponent = React.FC<RegisterFormProps>;