import { validate } from "./validation-logic";

export const checkInput = (data, type, errorKey, setError) => {    
  const value = validate(data, type);    
  if (value) {
    setError((prev) => ({
      ...prev,
      [errorKey]: value,
    }));
  }
};
