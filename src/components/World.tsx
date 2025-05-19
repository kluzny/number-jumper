import { useCallback, useEffect, useState } from "react";
import Frog from "./Frog";

const keyMap = {
  MOVE_JUMP: ["ArrowUp", "w", " "],
  MOVE_DOWN: ["ArrowDown", "s"],
  MOVE_LEFT: ["ArrowLeft", "a"],
  MOVE_RIGHT: ["ArrowRight", "d"],
};

// The World component is the main game area where the Frog component is rendered.
// it is a 3x5 grid with 0,0 at the top left and 2,4 at the bottom right
const DIM_WORLD_X = 5;
const DIM_WORLD_Y = 3;
const MAX_X = DIM_WORLD_X - 1;
const MAX_Y = DIM_WORLD_Y - 1;

const LEFT: [number, number] = [-1, 0];
const RIGHT: [number, number] = [1, 0];
const UP: [number, number] = [0, -1];
const DOWN: [number, number] = [0, 1];

function World() {
  const [position, setposition] = useState([0, 3]);

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
        },
        MOVE_RIGHT: (event?: KeyboardEvent) => {
          event?.preventDefault();
          console.log("Right");
          updatePosition(RIGHT);
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

  return (
    <div className="border-2 border-blue-500 rounded-lg m-4 h-120 bg-purple-200">
      <Frog />
      <p>p0: {position[0]}</p>
      <p>p1: {position[1]}</p>
    </div>
  );
}

export default World;
