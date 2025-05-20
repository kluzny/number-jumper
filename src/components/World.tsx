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
const DIM_WORLD_Y = 5;
const MAX_X = DIM_WORLD_X - 1;
const MAX_Y = DIM_WORLD_Y - 1;

const LEFT: [number, number] = [-1, 0];
const RIGHT: [number, number] = [1, 0];
const UP: [number, number] = [0, -1];
const DOWN: [number, number] = [0, 1];

function World() {
  const [position, setPosition] = useState([0, MAX_Y]);
  const [facing, setFacing] = useState(true); // true = right, false = left
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      function updatePosition(direction: [number, number]) {
        let wantsToJump = false;
        let wantsToFall = false;
        let wantsToMove = false;

        if (direction[0] !== 0) {
          wantsToMove = true;
        }

        if (direction[1] == -1) {
          wantsToJump = true;
        }

        if (direction[1] == 1) {
          wantsToFall = true;
        }

        const newPosition: [number, number] = [
          position[0] + direction[0],
          position[1] + direction[1],
        ];

        if (newPosition[0] < 0) {
          console.log("Already at left edge");
          newPosition[0] = 0;
          wantsToMove = false;
        }

        if (newPosition[1] < 0) {
          console.log("Already at top edge");
          newPosition[1] = 0;
          wantsToJump = false;
        }

        if (newPosition[0] > MAX_X) {
          console.log("Already at right edge");
          newPosition[0] = MAX_X;
          wantsToMove = false;
        }

        if (newPosition[1] > MAX_Y) {
          console.log("Already at bottom edge");
          newPosition[1] = MAX_Y;
          wantsToFall = false;
        }
        if (wantsToJump) {
          setIsAnimating(true);

          setIsJumping(true);
          setTimeout(() => {
            setPosition([...newPosition]);
            setIsJumping(false);
            setIsAnimating(false);
          }, 1000);
        } else if (wantsToFall) {
          setIsAnimating(true);

          setIsFalling(true);
          setTimeout(() => {
            setPosition([...newPosition]);
            setIsFalling(false);
            setIsAnimating(false);
          }, 1000);
        } else if (wantsToMove) {
          setIsAnimating(true);

          setIsMoving(true);
          setTimeout(() => {
            setPosition([...newPosition]);
            setIsMoving(false);
            setIsAnimating(false);
          }, 1000);
        }
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
          if (handler && !isAnimating) {
            handler(event);
          }
        }
      }
    },
    [position, isAnimating]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  const rows = [];
  for (let y = 0; y < DIM_WORLD_Y; y++) {
    const tiles = [];

    for (let x = 0; x < DIM_WORLD_X; x++) {
      if (x === position[0] && y == position[1]) {
        tiles.push(
          <Tile key={`${x}-${y}`}>
            <Frog
              facing={facing}
              isJumping={isJumping}
              isFalling={isFalling}
              isMoving={isMoving}
            />
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
