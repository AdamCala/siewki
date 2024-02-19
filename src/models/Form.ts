import * as yup from "yup";

type AuthType = "login" | "sign-up";
/**
 * Yup validation schema for authentication forms.
 * Validates the email, password, and confirmPassword fields.
 */
export const authFormSchema = (authType: AuthType) => {
  let schema = yup.object().shape({
    /**
     * Validates the email field.
     * - Should be a valid email address.
     * - Required field.
     * @type {yup.StringSchema}
     */
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Email address is required"),

    /**
     * Validates the password field.
     * - Should contain at least 8 characters.
     * - Required field.
     * @type {yup.StringSchema}
     */
    password: yup
      .string()
      .min(8, "Password needs to contain at least 8 characters")
      .required("Password is required"),
  });

  // If the authType is "sign-up", include confirmPassword validation
  if (authType === "sign-up") {
    schema = schema.shape({
      /**
       * Validates the confirmPassword field.
       * - Should match the value of the password field.
       * - Required field.
       * @type {yup.StringSchema}
       */
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
    });
  }

  return schema;
};
/**
 * Interface representing the shape of an authentication form.
 * Includes fields for email, password, and confirmPassword.
 * @interface AuthForm
 */
export interface AuthForm {
  email: string;
  password: string;
  confirmPassword?: string;
}
