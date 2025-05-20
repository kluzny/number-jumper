interface TileProps {
  children?: React.ReactNode;
}

function Tile(props: TileProps) {
  return (
    <div className="h-24 w-24 bg-blue-400 border-2 rounded-sm border-blue-600">
      {props.children}
    </div>
  );
}

export default Tile;
