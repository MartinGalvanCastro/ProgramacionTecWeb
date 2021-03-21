import FormComponent from "./form-component";

const form = require("./form.json");

/**
 * Función que renderiza un formulario de acuerdo a un JSON
 * @returns 
 */
export default function MyForm() {
  return (
   <FormComponent props={form}></FormComponent>
  );
}
