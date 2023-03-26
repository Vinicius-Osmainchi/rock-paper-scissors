import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './playerCard.css';

const PlayerCard = (props) => {
  const winnerImage = [
    { name: 1, img: 'images/winners/1.png' },
    { name: 2, img: 'images/winners/2.png' },
    { name: 3, img: 'images/winners/3.png' },
    { name: 4, img: 'images/winners/4.png' },
  ];

  const winnerImageHandler = () => {
    const randomImage = winnerImage[Math.floor(Math.random() * winnerImage.length)];

    return randomImage.img;
  };

  return (
    <Container>
      <Row className="p-0">
        <Col className="p-0">
          <Card bg="dark">
            <Card.Header as="h4" className="card-header">
              {props.winner ? (
                <div className="img-winner">
                  <img src={winnerImageHandler()}></img>
                </div>
              ) : (
                props.name
              )}
            </Card.Header>

            <Card.Img variant="top" src={props.image ? props.image.img : 'images/ph.png'} />
            <Card.Title as="h4" className="d-flex justify-content-center m-1">
              Score:{props.score}
            </Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayerCard;
