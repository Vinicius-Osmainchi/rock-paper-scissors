import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerCard from './components/PlayerCard';
import InitialPrompt from './components/InitialPrompt';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import PlayButtons from './components/PlayButtons';

const App = () => {
  const [playerOneChoice, setPlayerOneChoice] = useState(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState(null);
  const [playerOneImage, setPlayerOneImage] = useState(null);
  const [playerTwoimage, setPlayerTwoImage] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [draw, setDraw] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [winner, setWinner] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);

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
    console.log(props);
    setDifficulty(props.difficulty);
    setNumberOfPlayers(props.players);
  };

  const resetGame = () => {
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setPlayerOneImage(null);
    setPlayerTwoImage(null);
    setWinner(null);
  };

  const resetScore = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setDraw(0);
    resetGame();
  };

  const mainMenuHandler = () => {
    setDifficulty(0);
    resetScore();
  };

  useEffect(() => {
    if (!playerOneChoice || !playerTwoChoice) {
      return;
    }

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
          setDraw((draw) => draw + 1);
        }
      }
    }
    setDisableButtons(true);
    setTimeout(() => {
      resetGame(), setDisableButtons(false);
    }, 1500);
  }, [playerOneChoice, playerTwoChoice]);

  const playerOneClickHandler = (event) => {
    if (disableButtons) {
      return;
    }
    setPlayerOneChoice(event);
    setPlayerOneImage(images.find((reg) => reg.choice === event));

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
      setPlayerTwoImage(images.find((reg) => reg.choice === playerTwoChoice));
    }
  };

  const twoPlayersClickHandler = (event) => {
    if (disableButtons || numberOfPlayers === 1) {
      return;
    }
    setPlayerTwoChoice(event);
    setPlayerTwoImage(images.find((reg) => reg.choice === event));

    console.log(event);
  };

  return (
    <>
      <div className="img-center">
        <div className="img-draw">{winner === 3 && <img src="/images/winners/draw.png" />}</div>
      </div>
      {difficulty === 0 ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <InitialPrompt onStart={settingsHandler} />
        </div>
      ) : (
        <>
          <Container>
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
              <Row className="flex-nowrap">
                <Col
                  className="d-flex justify-content-center p-0 "
                  xs={6}
                  sm={{ offset: 1, span: 4 }}
                  lg={{ offset: 2, span: 3 }}
                >
                  <PlayerCard
                    name="Player One"
                    winner={winner === 1 && winner}
                    score={playerOneScore}
                    image={playerOneImage}
                    players={numberOfPlayers}
                  />
                </Col>

                <Col
                  className="d-flex justify-content-center p-0"
                  xs="6"
                  sm={{ offset: 2, span: 4 }}
                  lg={{ offset: 2, span: 3 }}
                >
                  <PlayerCard
                    name="Player Two"
                    winner={winner === 2 && winner}
                    score={playerTwoScore}
                    image={playerTwoimage}
                    players={numberOfPlayers}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="align-items-center text-center p-0 "
                  xs={12}
                  sm={{ offset: 4, span: 4 }}
                  lg={{ offset: 4, span: 4 }}>
                <Card bg='dark'><h4 className='m-1'>Draw: {draw}</h4></Card>
                </Col>
              </Row>
              <Row>
                <Col xs="6" sm={{ offset: 1, span: 4 }} lg={{ offset: 2, span: 3 }} className="p-0">
                  <PlayButtons onUserChoice={playerOneClickHandler} />
                </Col>
                <Col xs="6" sm={{ offset: 2, span: 4 }} lg={{ offset: 2, span: 3 }} className="p-0">
                  <PlayButtons onUserChoice={twoPlayersClickHandler} />
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </>
  );
};

export default App;
