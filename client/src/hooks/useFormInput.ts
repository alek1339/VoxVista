import { useState, ChangeEvent } from "react";


interface UseFormInput {
    <T>(initialState: T): {
      formData: T;
      handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void;
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
  
    return { formData, handleInputChange };
  };

  export default useFormInput;
  