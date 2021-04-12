import useInputForm from "../hooks/customHook";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as Joi from "joi";

const schema = Joi.object({
  name        : Joi.string().pattern(new RegExp("^[a-zA-Z ]*$")),
  company     : Joi.string().pattern(new RegExp("^[a-zA-Z ]*$")),
  salary      : Joi.string().pattern(new RegExp("^[1-9]{1}[0-9]*$")),
  city        : Joi.string().pattern(new RegExp("^[a-zA-Z]*,[a-zA-Z]*$")),
});

function Input() {
  const { handleSubmit, handleInputChange } = useInputForm(schema);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name" onChange={handleInputChange}>
        <Form.Label>Nombre de la oferta:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de la oferta"
          name="name"
        />
      </Form.Group>
      <Form.Group controlId="company" onChange={handleInputChange}> 
        <Form.Label>Nombre de la empresa:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre de empresa" name="company"/>
      </Form.Group>
      <Form.Group controlId="salary" onChange={handleInputChange}>
        <Form.Label>Salario:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el salario" name="salary"/>
      </Form.Group>
      <Form.Group controlId="city" onChange={handleInputChange}>
        <Form.Label>Ciudad:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese la ciudad" name="city"/>
      </Form.Group>
      <Button variant="primary" className="mr-2" type="submit">
            Aceptar
      </Button>
      <Button variant="danger" type="reset">
            Cancelar
      </Button>
    </Form>
  );
}

export default Input;
