import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './playerCard.css';

const PlayerCard = (props) => {
  return (
    <Container>
      <Row className="p-0">
        <Col className="p-0">
          <Card bg="dark">
            <Card.Header as="h4" className="d-flex justify-content-center">
              {props.name}
            </Card.Header>
            <Card.Img variant="top" src={props.image ? props.image.img : 'images/ph.png'} />
            <Card.Title as="h4" className="d-flex justify-content-center">
              Score:{props.score}
            </Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayerCard;
