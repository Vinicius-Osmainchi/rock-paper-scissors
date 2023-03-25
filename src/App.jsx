import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerCard from './components/PlayerCard';
import InitialPrompt from './components/InitialPrompt';
import { Col, Container, Row, Button } from 'react-bootstrap';
import PlayButtons from './components/PlayButtons';

const App = () => {
  const [playerOneChoice, setPlayerOneChoice] = useState(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState(null);
  const [playerOneImage, setPlayerOneImage] = useState(null);
  const [playerTwoimage, setPlayerTwoImage] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
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
      setWinner('Player One Wins!');
      setPlayerOneScore((playerOneScore) => playerOneScore + 1);
    } else {
      const foundPlayerTwoWinCondition = playerTwoWinCondition.find(
        (reg) => reg.playerOneChoice === playerOneChoice && reg.playerTwoChoice === playerTwoChoice
      );
      if (foundPlayerTwoWinCondition) {
        setWinner('Player Two Wins');
        setPlayerTwoScore((playerTwoScore) => playerTwoScore + 1);
      } else {
        if (playerOneChoice && playerTwoChoice) {
          setWinner('O jogo empatou!');
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
      {difficulty === 0 ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <InitialPrompt onStart={settingsHandler} />
        </div>
      ) : (
        <>
          <Button variant="light" onClick={mainMenuHandler}>
            Main Menu
          </Button>
          <Button variant="light" onClick={resetScore}>
            Reset
          </Button>
          <Row className='text-center mt-5'><h1 className='p-0'>{winner}</h1></Row>
          <Row className="flex-nowrap">
            <Col
              className="d-flex justify-content-center p-0 "
              xs={6}
              sm={{ offset: 1, span: 4 }}
              lg={{ offset: 2, span: 3 }}
            >
              <PlayerCard name="Player One" score={playerOneScore} image={playerOneImage} players={numberOfPlayers} />
            </Col>
            
            <Col
              className="d-flex justify-content-center p-0"
              xs="6"
              sm={{ offset: 2, span: 4 }}
              lg={{ offset: 2, span: 3 }}
            >
              <PlayerCard
                name="Player Two"
                score={playerTwoScore}
                selected={numberOfPlayers === 1 ? playerTwoChoice : 'playerTwoChoice'}
                image={playerTwoimage}
                players={numberOfPlayers}
              />
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
          <h1>Sua Escolha: {playerOneChoice} </h1>
          <h1>Escolha do Computador: {playerTwoChoice}</h1>
          <h1>Ganhador: {winner} </h1>
        </>
      )}
    </>
  );
};

export default App;
