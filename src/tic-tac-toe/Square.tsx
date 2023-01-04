export interface SquareProps {
  position: number;
  move: string | null;
  onClick: (position: number) => void;
}

const Square: React.FC<SquareProps> = ({ position, move, onClick }) => {
  return (
    <button className="square" onClick={() => onClick(position)}>
      {move}
    </button>
  );
};

export default Square;
