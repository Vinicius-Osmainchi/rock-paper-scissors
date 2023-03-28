import { useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

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
      difficulty: difficulty ? difficulty : 5,
      players,
    };
    props.onStart(settings);
  };

  const disableHandler = () => {
    if (!players || (players === 1 && !difficulty)) {
      return 'disabled';
    }
  };

  return (
    <Card className="card-dark text-center" bg="dark">
      <Card.Header as="h4">Welcome to Let's Rock! Paper and Scissors too!</Card.Header>
      <Card.Body>
        <Card.Title as='h6'>Please select the number of players.</Card.Title>
        <div className="mb-2">
          <ToggleButtonGroup type="radio" name="players" value={players} onChange={playersChangeHandler}>
            <ToggleButton variant="light" id="tbg-player-1" value={1}>
              1 Player
            </ToggleButton>
            <ToggleButton variant="light" id="tbg-player-2" value={2}>
              2 Players
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Card.Text as='h6'>Please select the difficulty.</Card.Text>
        <ToggleButtonGroup type="radio" name="difficulty" value={difficulty} onChange={difficultyHandler}>
          <ToggleButton variant="light" id="tbg-radio-1" value={7} disabled={players === 1 ? '' : 'disabled'}>
            Easy
          </ToggleButton>
          <ToggleButton variant="light" id="tbg-radio-2" value={5} disabled={players === 1 ? '' : 'disabled'}>
            Normal
          </ToggleButton>
          <ToggleButton variant="light" id="tbg-radio-3" value={2} disabled={players === 1 ? '' : 'disabled'}>
            Hard
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="light" onClick={startHandler} className="mt-3" disabled={disableHandler()}>
          START!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default initialPrompt;
