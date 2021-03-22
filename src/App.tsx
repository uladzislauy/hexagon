import React from 'react';
import './App.css';

enum GameStatus {
  RoundSelect = "round-select",
  Playing = "playing",
  GameOver = "game-over"
}

const sizeContainer = [2,3,4];

const gameHelp = "Use q, w, e, a, s, d keys for move";

function App() {
  const buttons = sizeContainer.map((x) => {
    return <button value='Value'>{x}</button>
  });

  return (
    <div className="App">
        <div>
          <div>RNG-server url</div>
          <input id="someId" type="text"></input>
          <div>Select radius: {buttons}</div>
        </div>

      <div>Gaming status: {GameStatus.RoundSelect}</div>
      <div>{gameHelp}</div>
    </div>
  );
}

export default App;
