import { useCallback, useState } from 'react';
import Board from './Board';
import { PlayerMove } from './types';
import './game.css';
import { calculateWinner } from './utils';

type MovesHistory = { moves: Array<PlayerMove> };

// ** Passing params without useCallback
// type DispatchReactState<T> = React.Dispatch<React.SetStateAction<T>>;

// const selectionHandler = (
//   position: number,
//   xIsNext: boolean,
//   currentStep: number,
//   history: Array<MovesHistory>,
//   setCurrentStep: DispatchReactState<number>,
//   setHistory: DispatchReactState<Array<MovesHistory>>,
//   setXIsNext: DispatchReactState<boolean>
// ) => {
//   const moves = history[currentStep].moves;
//   const winner = calculateWinner(moves);

//   if (moves[position] || winner) {
//     return;
//   }
//   const clonedMoves = moves.slice();
//   clonedMoves[position] = xIsNext ? 'X' : 'O';
//   const nextStep = currentStep + 1;
//   const clonedHistory = history.slice(0, nextStep);
//   setCurrentStep(nextStep);
//   setHistory([...clonedHistory, { moves: clonedMoves }]);
//   setXIsNext(!xIsNext);
// };

const Game: React.FC = () => {
  const [history, setHistory] = useState<Array<MovesHistory>>(() => [
    { moves: Array.from<PlayerMove>({ length: 9 }).fill(null) },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const moves = history[currentStep].moves;
  const winner = calculateWinner(moves);

  const selectionHandler = useCallback(
    (position: number) => {
      if (moves[position] || winner) {
        return;
      }
      const clonedMoves = moves.slice();
      clonedMoves[position] = xIsNext ? 'X' : 'O';
      const nextStep = currentStep + 1;
      const clonedHistory = history.slice(0, nextStep);
      setCurrentStep(nextStep);
      setHistory([...clonedHistory, { moves: clonedMoves }]);
      setXIsNext(!xIsNext);
    },
    [moves, xIsNext, winner, history, currentStep]
  );

  const jumpTo = useCallback((step: number) => {
    setXIsNext(step % 2 === 0);
    setCurrentStep(step);
  }, []);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board moves={moves} onSelection={selectionHandler} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((_, inx) => {
            return (
              <li key={inx} onClick={() => jumpTo(inx)}>{`Go to ${
                inx === 0 ? 'game start' : `step #${inx}`
              }`}</li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Game;
