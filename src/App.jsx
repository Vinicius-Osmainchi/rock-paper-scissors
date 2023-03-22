import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './app.module.css';
import PlayerOne from './components/PlayerOne';

const App = () => {
  const [userChoice, SetUserChoice] = useState(null);
  const [computerChoice, SetComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);

  const choices = ['Rock', 'Paper', 'Scissors'];

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
  const drawCondition = [
    { userChoice: 'Rock', computerChoice: 'Rock' },
    { userChoice: 'Paper', computerChoice: 'Paper' },
    { userChoice: 'Scissors', computerChoice: 'Scissors' },
  ];

  useEffect(() => {
    const foundWinCondition = playerOneWinCondition.find(
      (result) => result.userChoice === userChoice && result.computerChoice === computerChoice
    );
    
    if (foundWinCondition) {
      setWinner('Você Ganhou!');
    } else {
      const foundComputerWinCondition = computerWinCondition.find(
        (result) => result.userChoice === userChoice && result.computerChoice === computerChoice
      );
      if (foundComputerWinCondition) {
        setWinner('Computador Ganhou!');
      } else { if (userChoice && computerChoice) {
        setWinner('O jogo empatou!');}
      }
    }
  }, [userChoice, computerChoice]);

  
  const clickHandler = (event) => {
    SetUserChoice(event.target.value);
    SetComputerChoice(choices[Math.floor(Math.random() * choices.length)]);
  };

  return (
    <div className={styles.teste}>
      <PlayerOne />
      <h1>Sua Escolha: {userChoice} </h1>
      <h1>Escolha do Computador: {computerChoice}</h1>
      <h1>Ganhador: {winner} </h1>
      {choices.map((choice, index) => (
        <button key={index} value={choice} onClick={clickHandler}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default App;
