import { Card, Col, Container, Row } from 'react-bootstrap';

const PlayerCard = (props) => {
  
    return (
    <Container>
      <Row className="p-0">
        <Col className="p-0">
          <Card bg="dark">
            <Card.Header as="h4" className="card-header">
              {props.winner ? (
                <div className="img-winner">
                  <img src='images/winners/1.png'></img>
                </div>
              ) : (
                props.name
              )}
            </Card.Header>
           <div className={props.flipper ? 'main-card main-flipped' : 'main-card'}>
            <Card.Img className='p-2' variant="top" src={props.image ? props.image.img : 'images/ph.png'} />
            </div>
           <div className='card-block card-back'>
            <Card.Img className='p-2' variant="top" src={'images/ph.png'} />
            </div>
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
