import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import Jobs from "./Jobs";
import Input from "./Input"

const App = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Job List</h1>
      <span>Actualizar pagina despues del ingresar la nueva oferta</span>
    </Jumbotron>
    <Row>
      <Col className="col-6 border border-dark">
        <Jobs />
      </Col>
      <Col className="col-6 border border-dark">
        <Input/>
      </Col>
    </Row>
  </Container>
);

export default App;
