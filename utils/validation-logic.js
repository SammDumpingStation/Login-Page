const validate = (
  text,
  { email = false, password = false, register = false } = {}
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (text.length === 0 || text === "") {
    return "Please fill out this field.";
  }
  if (text.length < 3) {
    return "The input is too short. Please enter at least 3 characters.";
  }
  if (text.length > 128) {
    return "The input is too long. Please enter fewer than 128 characters.";
  }
  if (email && !emailRegex.test(text)) {
    return "Please enter a valid email address.";
  }

  if (password && text.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (password && register && !passwordRegex.test(text)) {
    return "Password must include at least 8 characters, with one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return "";
};

export default { validate };
