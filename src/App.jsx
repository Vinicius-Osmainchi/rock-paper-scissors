import { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import InitialPrompt from './components/InitialPrompt';
import PlayerCard from './components/PlayerCard';
import PlayButtons from './components/PlayButtons';

const App = () => {
  const [playerOneChoice, setPlayerOneChoice] = useState(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState(null);
  const [playerOneImage, setPlayerOneImage] = useState(null);
  const [playerTwoImage, setPlayerTwoImage] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [winner, setWinner] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const [playerOneCardFlipper, setPlayerOneCardFlipper] = useState(false);
  const [playerTwoCardFlipper, setPlayerTwoCardFlipper] = useState(false);

  const choices = ['Rock', 'Paper', 'Scissors'];

  const images = [
    { choice: 'Rock', img: 'images/newrock.png' },
    { choice: 'Paper', img: 'images/newpaper.png' },
    { choice: 'Scissors', img: 'images/newscissors.png' },
  ];

  const playerOneWinCondition = [
    { playerOneChoice: 'Rock', playerTwoChoice: 'Scissors' },
    { playerOneChoice: 'Paper', playerTwoChoice: 'Rock' },
    { playerOneChoice: 'Scissors', playerTwoChoice: 'Paper' },
  ];

  const playerTwoWinCondition = [
    { playerOneChoice: 'Rock', playerTwoChoice: 'Paper' },
    { playerOneChoice: 'Paper', playerTwoChoice: 'Scissors' },
    { playerOneChoice: 'Scissors', playerTwoChoice: 'Rock' },
  ];

  const settingsHandler = (props) => {
    setDifficulty(props.difficulty);
    setNumberOfPlayers(props.players);
  };

  const resetGame = () => {
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setPlayerOneImage(null);
    setPlayerTwoImage(null);
    setPlayerOneCardFlipper(false);
    setPlayerTwoCardFlipper(false);
    setWinner(null);
  };

  const resetScore = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setDrawCount(0);
    resetGame();
  };

  const mainMenuHandler = () => {
    setDifficulty(0);
    resetScore();
  };

  useEffect(() => {
    playerOneChoice ? setPlayerOneCardFlipper(true) : '';
  }, [playerOneChoice]);

  useEffect(() => {
    playerTwoChoice ? setPlayerTwoCardFlipper(true) : '';
  }, [playerTwoChoice]);

  useEffect(() => {
    if (!playerOneChoice || !playerTwoChoice) {
      return;
    }

    setTimeout(() => {
      setPlayerTwoImage(images.find((reg) => reg.choice === playerTwoChoice));

      const foundWinCondition = playerOneWinCondition.find(
        (reg) => reg.playerOneChoice === playerOneChoice && reg.playerTwoChoice === playerTwoChoice
      );
      if (foundWinCondition) {
        setWinner(1);
        setPlayerOneScore((playerOneScore) => playerOneScore + 1);
      } else {
        const foundPlayerTwoWinCondition = playerTwoWinCondition.find(
          (reg) => reg.playerOneChoice === playerOneChoice && reg.playerTwoChoice === playerTwoChoice
        );
        if (foundPlayerTwoWinCondition) {
          setWinner(2);
          setPlayerTwoScore((playerTwoScore) => playerTwoScore + 1);
        } else {
          if (playerOneChoice && playerTwoChoice) {
            setWinner(3);
            setDrawCount((drawCount) => drawCount + 1);
          }
        }
      }
    }, 300);
    setDisableButtons(true);
    setTimeout(() => {
      setPlayerOneCardFlipper(false),
        setPlayerTwoCardFlipper(false),
        setTimeout(() => {
          resetGame(), setDisableButtons(false);
        }, 300);
    }, 2000);
  }, [playerOneChoice, playerTwoChoice]);

  const playerOneClickHandler = (event) => {
    if (disableButtons) {
      return;
    }

    setPlayerOneChoice(event);
    setTimeout(() => {
      setPlayerOneImage(images.find((reg) => reg.choice === event));
    }, 300);

    if (numberOfPlayers === 1) {
      const { playerTwoChoice } = playerOneWinCondition.find((reg) => reg.playerOneChoice === event);
      const playerTwoChoices = [];
      for (let i = 0; i < difficulty; i++) {
        playerTwoChoices.push(playerTwoChoice);
      }
      const loosingChoices = choices.filter((reg) => reg !== playerTwoChoice);

      const playerTwoChoicesLength = playerTwoChoices.length;

      for (let i = 0; i < 10 - playerTwoChoicesLength; i++) {
        playerTwoChoices.push(loosingChoices[Math.floor(Math.random() * loosingChoices.length)]);
      }
      setPlayerTwoChoice(playerTwoChoices[Math.floor(Math.random() * playerTwoChoices.length)]);
    }
  };

  const twoPlayersClickHandler = (event) => {
    if (disableButtons || numberOfPlayers === 1) {
      return;
    }
    setPlayerTwoChoice(event);
    setTimeout(() => {
      setPlayerTwoImage(images.find((reg) => reg.choice === event));
    }, 300);
  };

  return (
    <>
      {winner === 3 && (
        <div className="img-center">
          <img className="img-draw" src="/images/winners/draw.png" />
        </div>
      )}

      {difficulty === 0 ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <InitialPrompt onStart={settingsHandler} />
        </div>
      ) : (
        <Container className="p-0">
          <Row className="d-flex justify-content-between mb-4">
            <Col>
              <Button variant="light" onClick={mainMenuHandler}>
                Main Menu
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="light" onClick={resetScore}>
                Reset
              </Button>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col
                className="d-flex justify-content-center p-0 "
                xs={6}
                md={{ offset: 1, span: 4 }}
                lg={{ offset: 2, span: 3 }}
              >
                <PlayerCard
                  name="Player One"
                  winner={winner === 1 && winner}
                  score={playerOneScore}
                  image={playerOneImage}
                  players={numberOfPlayers}
                  flipper={playerOneCardFlipper}
                />
              </Col>
              <Col
                className="d-flex justify-content-center p-0"
                xs="6"
                md={{ offset: 2, span: 4 }}
                lg={{ offset: 2, span: 3 }}
              >
                <PlayerCard
                  name="Player Two"
                  winner={winner === 2 && winner}
                  score={playerTwoScore}
                  image={playerTwoImage}
                  players={numberOfPlayers}
                  flipper={playerTwoCardFlipper}
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={numberOfPlayers === 1 ? { offset: 2, span: 8 } : '6'}
                md={{ offset: 1, span: 4 }}
                lg={{ offset: 2, span: 3 }}
                className="p-0"
              >
                <PlayButtons onUserChoice={playerOneClickHandler} />
              </Col>
              {numberOfPlayers === 2 && (
                <Col xs="6" md={{ offset: 2, span: 4 }} lg={{ offset: 2, span: 3 }} className="p-0">
                  <PlayButtons onUserChoice={twoPlayersClickHandler} />
                </Col>
              )}
            </Row>
            <Row>
              <Col className="align-items-center text-center p-0" xs={{ offset: 4, span: 4 }}>
                <Card bg="dark">
                  <h4 className="m-1">Draw: {drawCount}</h4>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
};

export default App;
