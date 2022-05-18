import React from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { CellC } from './CellC';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const BoardC: React.FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);

  const clickCell = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  React.useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  return (
    <div>
      <h3>Текущий игрок: {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellC
                clickCell={clickCell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                key={cell.id}
                cell={cell}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
