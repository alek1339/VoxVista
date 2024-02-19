// Check if the input is a valid email address
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Check if the password meets the minimum requirements
export const isValidPassword = (password: string): boolean => {
  // Require at least one uppercase letter, one lowercase letter, one digit, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      return passwordRegex.test(password) && password.length >= 8; // Minimum 8 characters
};
   
  // Check if the username meets the minimum requirements
  export const isValidUsername = (username: string): boolean => {
    // Customize this function based on your requirements
    return username.length >= 4 && username.length <= 20; // Between 4 and 20 characters for this example
  };
  