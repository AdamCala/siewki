import * as yup from "yup";
/**
 * Yup validation schema for new tray forms.
 * Validates the name cols and rows fields.
 */
export const trayFormSchema = () => {
  let schema = yup.object().shape({
    /**
     * Validates the name field.
     * - Required field.
     * @type {yup.StringSchema}
     */
    name: yup
      .string()
      .max(64, "Name cannot be logner than 64 character")
      .required("Tray Name address is required"),

    /**
     * Validates the cols field.
     * - Should be a int greater tan 0.
     * - Required field.
     * @type {yup.StringSchema}
     */
    cols: yup
      .number()
      .typeError("Please provide a col number")
      .integer("Column count cannot be a fraction")
      .moreThan(0, "You need to define at least 1 column")
      .required("Please provide a col number"),

    /**
     * Validates the rows field.
     * - Should be a int greater tan 0.
     * - Required field.
     * @type {yup.StringSchema}
     */
    rows: yup
      .number()
      .typeError("Please provide a row number")
      .integer("Row count cannot be a fraction")
      .moreThan(0, "You need to define at least 1 row")
      .required("Please provide a row number"),

    /**
     * Validates the owner field.
     * - Required field.
     * @type {yup.StringSchema}
     */
    owner: yup.string().required("You must be logged in"),
  });
  return schema;
};
/**
 * Interface representing the shape of an tray form.
 * Includes fields for name, cols, and rows.
 * @interface AuthForm
 */
export interface TrayForm {
  name: string;
  cols: number;
  rows: number;
  owner: string;
}
