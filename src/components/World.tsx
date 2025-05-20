import { useCallback, useEffect, useState } from "react";
import Frog from "./Frog";
import Tile from "./Tile";

const keyMap = {
  MOVE_JUMP: ["ArrowUp", "w", " "],
  MOVE_DOWN: ["ArrowDown", "s"],
  MOVE_LEFT: ["ArrowLeft", "a"],
  MOVE_RIGHT: ["ArrowRight", "d"],
};

// The World component is the main game area where the Frog component is rendered.
// it is a NxM grid with 0,0 at the top left and N-1,M-1 at the bottom right
const DIM_WORLD_X = 10;
const DIM_WORLD_Y = 4;
const MAX_X = DIM_WORLD_X - 1;
const MAX_Y = DIM_WORLD_Y - 1;

const LEFT: [number, number] = [-1, 0];
const RIGHT: [number, number] = [1, 0];
const UP: [number, number] = [0, -1];
const DOWN: [number, number] = [0, 1];

function World() {
  const [position, setposition] = useState([0, 3]);
  const [facing, setFacing] = useState(true); // true = right, false = left

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      function updatePosition(direction: [number, number]) {
        const newPosition: [number, number] = [
          position[0] + direction[0],
          position[1] + direction[1],
        ];

        if (newPosition[0] < 0) {
          console.log("Already at left edge");
          newPosition[0] = 0;
        }

        if (newPosition[1] < 0) {
          console.log("Already at top edge");
          newPosition[1] = 0;
        }

        if (newPosition[0] > MAX_X) {
          console.log("Already at right edge");
          newPosition[0] = MAX_X;
        }

        if (newPosition[1] > MAX_Y) {
          console.log("Already at bottom edge");
          newPosition[1] = MAX_Y;
        }

        setposition([...newPosition]);
      }

      const handlers = {
        MOVE_JUMP: (event?: KeyboardEvent) => {
          event?.preventDefault();
          console.log("Jump");
          updatePosition(UP);
        },
        MOVE_DOWN: (event?: KeyboardEvent) => {
          event?.preventDefault();
          console.log("Down");
          updatePosition(DOWN);
        },
        MOVE_LEFT: (event?: KeyboardEvent) => {
          event?.preventDefault();
          console.log("Left");
          updatePosition(LEFT);
          setFacing(false);
        },
        MOVE_RIGHT: (event?: KeyboardEvent) => {
          event?.preventDefault();
          console.log("Right");
          updatePosition(RIGHT);
          setFacing(true);
        },
      };

      for (const [action, keys] of Object.entries(keyMap)) {
        if (keys.includes(event.key)) {
          const handler = handlers[action as keyof typeof handlers];
          if (handler) {
            handler(event);
          }
        }
      }
    },
    [position]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  const rows = [];
  for (let y = 0; y < DIM_WORLD_Y; y++) {
    let tiles = [];

    for (let x = 0; x < DIM_WORLD_X; x++) {
      if (x === position[0] && y == position[1]) {
        tiles.push(
          <Tile key={`${x}-${y}`}>
            <Frog facing={facing} />
          </Tile>
        );
      } else {
        tiles.push(<Tile key={`${x}-${y}`} />);
      }
    }

    rows.push(
      <section key={`section-${y}`} className="flex">
        {tiles}
      </section>
    );
  }

  return (
    <div className="border-2 border-blue-500 rounded-lg m-4 bg-purple-200 w-fit mx-auto">
      {rows}
    </div>
  );
}

export default World;
