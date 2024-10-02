export const validate = (value, type = "default") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (value === "" || value.length === 0) {
    return "Please fill out this field.";
  }
  if (value.length < 3) {
    return "The input is too short. Please enter at least 3 characters.";
  }
  if (value.length > 128) {
    return "The input is too long. Please enter fewer than 128 characters.";
  }
  if (type === "email" && !emailRegex.test(value)) {
    return "Please enter a valid email address.";
  }

  if (type === "password" && value.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (type === "phone_number" && value.length > 11) {
    return "Maximum of 11-digits only";
  }
  if (type === "phone_number" && value.length < 11) {
    return "Minimum number of 11-digits";
  }
  // if (password && register && !passwordRegex.test(value)) {
  //   return `Password must include at least 8 characters, with one uppercase letter, one lowercase letter, one number, and one special character.`;
  // }
  return "";
};
