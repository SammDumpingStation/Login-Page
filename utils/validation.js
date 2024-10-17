import * as yup from "yup";

const phoneNumberRegex = /^09\d{9}$/;

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

export const updateUserSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name field is required.")
    .min(4, "Name must contain at least 4 characters.")
    .max(50, "Name must contain at most 50 characters."),

  phoneNumber: yup
    .string()
    .required("Phone Number field is required.")
    .matches(
      phoneNumberRegex,
      "Please enter a valid mobile number"
    ),
});
