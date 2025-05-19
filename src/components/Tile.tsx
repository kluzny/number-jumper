interface TileProps {
  children?: React.ReactNode;
}

function Tile(props: TileProps) {
  return (
    <div className="h-24 w-24 bg-gray-200 border-2 rounded-sm border-gray-400">
      {props.children}
    </div>
  );
}

export default Tile;
