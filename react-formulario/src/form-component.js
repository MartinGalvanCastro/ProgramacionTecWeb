import * as Joi from "joi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useSignupForm from "./myFormHook";

/**
 * Función de validación de cada campo
 * @param {*} validation, validaciones de el campo 
 * @returns 
 */
function validationSquema(validation) {
  return null;
}


/**
 * Funcion para renderizar los campos del formulario
 * @param {*} field, Campo del formulario
 * @param {*} handleInputChange, Función de handle input change 
 * @returns Input renderizado
 */
function FieldComponent(field,handleInputChange) {
  console.log(field.validation)
  return (
    <div className="col-6" key={field.id}>
      <Form.Group controlId={field.id}>
        <Form.Label>{field.label}</Form.Label>
        <Form.Control
          type={field.type}
          name={field.id}
          placeholder={field.placeHolder}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
    </div>
  );
}

/**
 * Función que renderiza un formulario con dos botones
 * @param {*} props, archivo JSON que tiene los datos del formulario 
 * @returns Formulario renderizado
 */
function FormComponent(props) {
  const { handleSubmit, handleInputChange } = useSignupForm();
  const formMetadata = props.props.metadata;
  const formFields = props.props.fields;
  return (
    <Form onSubmit={handleSubmit}
      autoComplete={formMetadata.autocomplete}>
      <Row>
        {formFields.map((field) => {
          return FieldComponent(field,handleInputChange);
        })}
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" className="mr-2" type="submit">
            Aceptar
          </Button>
          <Button variant="danger" type="reset">
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormComponent;
