const validate = (text, { email = false, password = false }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (text.length === 0 || text === "") {
    return "This Field is required";
  }
  if (text.length < 3) {
    return "Too short.";
  }
  if (text.length > 128) {
    return "Too long.";
  }
  if (email && !emailRegex.test(text)) {
    return "Invalid Email Format";
  }

  if (password && text.length < 8) {
    return "Password must be at least 8 characters long";
  }
  // if (password && !passwordRegex.test(text)) {
  //   return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  // }
};

export default { validate };
