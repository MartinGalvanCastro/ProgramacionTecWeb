import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyForm from "./myForm";
import Card from "react-bootstrap/Card";

ReactDOM.render(
  <div className="container d-flex justify-content-center">
    <Card>
      <Card.Header>
        <h1>My JSON Form</h1>
      </Card.Header>
      <Card.Body>
        <MyForm></MyForm>
      </Card.Body>
      <Card.Footer>
        <span>Author: Martin Galvan</span>
      </Card.Footer>
    </Card>
  </div>,
  document.getElementById("root")
);
