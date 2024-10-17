import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required.")
    .email("Please enter a valid email address."),
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),
});

export const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name field is required.")
    .min(4, "Name must contain at least 4 characters.")
    .max(50, "Name must contain at most 50 characters."),

  email: yup
    .string()
    .required("Email field is required.")
    .email("Please enter a valid email address."),

  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),

  confirmPassword: yup
    .string()
    .required("Confirm Password field is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// export const validate = (value, type = "default.") => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   // const passwordRegex =
//   //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (value === "" || value.length === 0) {
//     return "Please fill out this field.";
//   }
//   if (value.length < 3) {
//     return "The input is too short. Please enter at least 3 characters.";
//   }
//   if (value.length > 128) {
//     return "The input is too long. Please enter fewer than 128 characters.";
//   }
//   if (type === "email" && !emailRegex.test(value)) {
//     return "Please enter a valid email address.";
//   }

//   if (type === "password" && value.length < 8) {
//     return "Password must be at least 8 characters long.";
//   }

//   if (type === "phone_number" && value.length > 11) {
//     return "Maximum of 11-digits only";
//   }
//   if (type === "phone_number" && value.length < 11) {
//     return "Minimum number of 11-digits";
//   }
//   // if (password && register && !passwordRegex.test(value)) {
//   //   return `Password must include at least 8 characters, with one uppercase letter, one lowercase letter, one number, and one special character.`;
//   // }
//   return "";
// };
