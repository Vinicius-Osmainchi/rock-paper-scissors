import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerCard from './components/PlayerCard';
import InitialPrompt from './components/InitialPrompt';
import { Col, Container, Row, Button } from 'react-bootstrap';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  let configuring = '';
  const settingsHandler = (props) => {
    console.log(props);
    setDifficulty(props.difficulty);
    configuring = true;
  };

  const resetHandler = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setWinner(null);
    setDifficulty(0);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  };

  const choices = ['Rock', 'Paper', 'Scissors'];
  let computerChoices = undefined;

  const playerOneWinCondition = [
    { userChoice: 'Rock', computerChoice: 'Scissors' },
    { userChoice: 'Paper', computerChoice: 'Rock' },
    { userChoice: 'Scissors', computerChoice: 'Paper' },
  ];
  const computerWinCondition = [
    { userChoice: 'Rock', computerChoice: 'Paper' },
    { userChoice: 'Paper', computerChoice: 'Scissors' },
    { userChoice: 'Scissors', computerChoice: 'Rock' },
  ];

  useEffect(() => {
    const foundWinCondition = playerOneWinCondition.find(
      (reg) => reg.userChoice === userChoice && reg.computerChoice === computerChoice
    );
    if (foundWinCondition) {
      setWinner('Player One Wins!');
      setPlayerOneScore(playerOneScore + 1);
    } else {
      const foundComputerWinCondition = computerWinCondition.find(
        (reg) => reg.userChoice === userChoice && reg.computerChoice === computerChoice
      );
      if (foundComputerWinCondition) {
        setWinner('Computador Ganhou!');
        setPlayerTwoScore(playerTwoScore + 1);
      } else {
        if (userChoice && computerChoice) {
          setWinner('O jogo empatou!');
        }
      }
    }
  }, [userChoice, computerChoice]);

  const clickHandler = (event) => {
    setUserChoice(event.target.value);

    const { computerChoice } = playerOneWinCondition.find((reg) => reg.userChoice === event.target.value);
    computerChoices = [];
    for (let i = 0; i < difficulty; i++) {
      computerChoices.push(computerChoice);
    }
    const loosingChoices = choices.filter((reg) => reg !== computerChoice);

    const computerChoicesLength = computerChoices.length;
    for (let i = 0; i < 10 - computerChoicesLength; i++) {
      computerChoices.push(loosingChoices[Math.floor(Math.random() * loosingChoices.length)]);
    }
    console.log(computerChoices);
    setComputerChoice(computerChoices[Math.floor(Math.random() * computerChoices.length)]);
  };

  return (
    <>
      {difficulty === 0 ? (<div className='d-flex h-100 '>
        <InitialPrompt onStart={settingsHandler} />
        </div>) : (
        <>
          <Button onClick={resetHandler}>Reset</Button>
          <Row className="flex-nowrap">
            <Col className="d-flex justify-content-center" xs={6} md={{ offset: 3, span: 3 }} lg={{ offset: 3, span: 3 }}>
              <PlayerCard name="Player One" score={playerOneScore} />
            </Col>
            <Col className="d-flex justify-content-center" xs={6} md={3} lg={3}>
              <PlayerCard name="Player Two" score={playerTwoScore}/>
            </Col>
          </Row>

          <h1>Sua Escolha: {userChoice} </h1>
          <h1>Escolha do Computador: {computerChoice}</h1>
          <h1>Ganhador: {winner} </h1>
          {choices.map((choice, index) => (
            <Button key={index} value={choice} onClick={clickHandler}>
              {choice}
            </Button>
          ))}
        </>
      )}
    </>
  );
};

export default App;
