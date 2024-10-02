import validationLogic from './validation-logic'
export const checkInput = (data, type, errorKey, setter) => {
  const value = validationLogic.validate(data, type);
  if (value) {
    setter((prev) => ({
      ...prev,
      [errorKey]: value,
    }));
  }
};

