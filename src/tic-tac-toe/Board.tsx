import Square, { SquareProps } from './Square';
import { PlayerMove } from './types';

interface BoardProps {
  moves: Array<PlayerMove>;
  onSelection: (position: number) => void;
}

function renderSquare(props: SquareProps) {
  return <Square key={props.position} {...props} />;
}

const Board: React.FC<BoardProps> = ({ moves, onSelection }) => {
  return (
    <div>
      {[0, 3, 6].map(startPosition => {
        return (
          <div key={startPosition} className="board-row">
            {moves.slice(startPosition, startPosition + 3).map((move, inx) => {
              return renderSquare({
                position: startPosition + inx,
                move,
                onClick: onSelection,
              });
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
