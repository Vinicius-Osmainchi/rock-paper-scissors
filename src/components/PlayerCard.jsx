import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row } from 'react-bootstrap';


const PlayerCard = (props) => {
  
  return (
    <Card bg='dark' style={{ width: '15rem' }}>
      <Card.Header>Score:{props.score}</Card.Header>
      <Card.Img
        variant="top"
        src="images\PlaceHolder-nobg.png"
      />
      <Card.Title>{props.name}</Card.Title>
    </Card>
  );
};

export default PlayerCard;
