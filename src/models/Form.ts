import * as yup from "yup";

export const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email adress")
    .required("Email adress is required"),
  password: yup
    .string()
    .min(8, "Password needs to contail at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm passowrd is required"),
});

export interface AuthForm {
  email: string;
  password: string;
  confirmPassword: string;
}
