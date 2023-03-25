import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const PlayButtons = (props) => {

    const clickHandler = (event) => {
        props.onUserChoice(event.target.id)
    }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs="4" sm="4" md="4" lg="4" className="p-0">
          <Card bg="dark" id="Rock" className="card-option" onClick={clickHandler}>
            <Card.Img id="Rock" src="images\rock.png" />
          </Card>
        </Col>
        <Col xs="4" sm="4" md="4" lg="4" className="p-0">
          <Card bg="dark" id="Paper" className="card-option" onClick={clickHandler}>
            <Card.Img id="Paper" src="images\paper.png" />
          </Card>
        </Col>
        <Col xs="4" sm="4" md="4" lg="4" className="p-0">
          <Card bg="dark" id="Scissors" className="card-option" onClick={clickHandler}>
            <Card.Img id="Scissors" src="images\scissors.png" />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayButtons;
