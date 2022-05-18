import React from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  clickCell: (cell: Cell) => void;
}

export const CellC: React.FC<CellProps> = ({ cell, selected, clickCell }) => {
  return (
    <div
      onClick={() => clickCell(cell)}
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}>
      {cell.available && !cell.figure && <div className={'available'}></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};
