import { useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './initialPrompt.css';

const initialPrompt = (props) => {
  const [difficulty, setDifficulty] = useState(null);
  const [players, setPlayers] = useState(null);

  const difficultyHandler = (val) => setDifficulty(val);
  const playersChangeHandler = (val) => {
    setPlayers(val);
    val === 2 ? setDifficulty(null) : '';
  };

  const startHandler = () => {
    const settings = {
      difficulty: (difficulty ? difficulty : 5),
      players,
    };
    props.onStart(settings);
  };

  return (
    <Card className="card-dark text-center" bg="dark">
      <Card.Header as="h5">Welcome to Lets Rock! Paper and Scissors too!</Card.Header>
      <Card.Body>
        <Card.Title>How many players?</Card.Title>
        <div className="mb-2">
          <ToggleButtonGroup type="radio" name="players" value={players} onChange={playersChangeHandler}>
            <ToggleButton id="tbg-player-1" value={1}>
              1 Player
            </ToggleButton>
            <ToggleButton id="tbg-player-2" value={2}>
              2 Players
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Card.Text>Please select the number of players.</Card.Text>
        <ToggleButtonGroup type="radio" name="difficulty" value={difficulty} onChange={difficultyHandler}>
          <ToggleButton id="tbg-radio-1" value={7} disabled={players === 1 ? '' : 'disabled'}>
            Easy
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value={5} disabled={players === 1 ? '' : 'disabled'}>
            Normal
          </ToggleButton>
          <ToggleButton id="tbg-radio-3" value={2} disabled={players === 1 ? '' : 'disabled'}>
            Hard
          </ToggleButton>
        </ToggleButtonGroup>
        <Button onClick={startHandler} className="mt-3">
          START!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default initialPrompt;