import * as Joi from "joi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useSignupForm from "./myFormHook";

/**
 * Función de validación de cada campo
 * @param {*} validation, validaciones de el campo
 */
function validationSquema(field) {
  let valid = null;
  let isValid = true;
  switch (field.type) {
    case "text":
      valid = Joi.string();
      break;
    case "email":
      valid = Joi.string().email({ tlds: { allow: false } });
      break;
    case "tel":
      valid = Joi.string();
      break;
    case "password":
      if(field.id==="repeat-password"){
        valid = Joi.ref("password");
        isValid=false;
      }else{
        valid = Joi.string()
      }
      break;
    default:
      isValid = false;
      break;
  }

  if (isValid) {
    field.validation.forEach((req) => {
      switch (req.name) {
        case "required":
          valid = valid.required();
          break;
        case "minLength":
          valid = valid.min(req.value);
          break;
        case "pattern":
          valid = valid.regex(new RegExp(req.value));
          break;
        case "equal":
          valid = valid.ref(req.value);
          break;
        default:
          break;
      }

      valid.error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = req.badMessage;
              break;
            case "any.min":
              err.message = req.badMessage;
              break;
            case "any.regex":
              err.message = req.badMessage;
              break;
            default:
              err.message = err.type;
          }
        });
      });
    });
  }

  return { [field.id]: valid };
}

/**
 * Funcion para renderizar los campos del formulario
 * @param {*} field, Campo del formulario
 * @param {*} handleInputChange, Función de handle input change
 * @returns Input renderizado
 */
function FieldComponent(field, handleInputChange) {
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
  const formMetadata = props.props.metadata;
  const formFields = props.props.fields;
  let validationFields = [...formFields];
  validationFields = validationFields.map((field) => validationSquema(field));
  let joiSchema = {}
  validationFields.forEach((field) => joiSchema = {...joiSchema,...field});
  joiSchema = Joi.object(joiSchema)
  const { handleSubmit, handleInputChange, errors } = useSignupForm(joiSchema);
  console.log(errors)
  return (
    <Form onSubmit={handleSubmit} autoComplete={formMetadata.autocomplete}>
      <Row>
        {formFields.map((field) => {
          return FieldComponent(field, handleInputChange);
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
      <Row className="mt-3">
        <Col>
        <p>
          {errors.toString()}
        </p>
        </Col>
      </Row>
    </Form>
  );
}

export default FormComponent;
