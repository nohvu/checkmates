import React from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = React.useState(300);
  const [whiteTime, setWhiteTime] = React.useState(300);
  const timer = React.useRef<null | ReturnType<typeof setInterval>>(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.BLACK ? decrementBlackTimer : decrementWhiteTimer;
    timer.current = setInterval(callback, 1000);
  };

  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };
  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const handleTimer = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  };

  React.useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  return (
    <div>
      <div>
        <button onClick={handleTimer}>New Game</button>
      </div>
      <h2>Black player time: {blackTime}</h2>
      <h2>White player time: {whiteTime}</h2>
    </div>
  );
};
