import React from 'react';
import './App.css';
import { BoardC } from './components/BoardC';
import { LostFigures } from './components/LostFigures';
import { Timer } from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = React.useState(new Board());
  const [whitePlayer, setWhitePlayer] = React.useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = React.useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };
  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  React.useEffect(() => {
    restart();
  }, []);

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />

      <BoardC
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Black Figures" figures={board.lostBlackFigures} />
        <LostFigures title="White Figures" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
