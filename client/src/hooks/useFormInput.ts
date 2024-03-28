import { useState, ChangeEvent } from "react";

interface UseFormInput {
  <T>(initialState: T): {
    formData: T;
    handleInputChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    resetForm: () => void;
  };
}

const useFormInput: UseFormInput = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState); // Reset formData to initialState
  };

  return { formData, handleInputChange, resetForm };
};

export default useFormInput;
