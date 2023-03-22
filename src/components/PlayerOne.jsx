import React from 'react';
import styles from './playerOne.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

const PlayerOne = () => {
  return (
    <Card bg='dark' style={{ width: '18rem' }}>
      <Card.Header>Score: 00</Card.Header>
      <Card.Img
        variant="top"
        src="images\PlaceHolder.jpg"
      />
      <Card.Title>Player One</Card.Title>
    </Card>
  );
};

export default PlayerOne;
