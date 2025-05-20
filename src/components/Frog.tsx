import "../assets/styles/frog.css";

interface FrogProps {
  facing: boolean;
  isJumping: boolean;
  isFalling: boolean;
  isMoving: boolean;
}

function Frog({ facing, isJumping, isFalling, isMoving }: FrogProps) {
  const frogClasses = ["frog"];
  if (isMoving) {
    frogClasses.push("leaping");
    if (facing) {
      frogClasses.push("right");
    } else {
      frogClasses.push("left");
    }
  } else if (isJumping) {
    frogClasses.push("leaping jump");
  } else if (isFalling) {
    frogClasses.push("leaping fall");
  } else {
    frogClasses.push("idle");
  }

  // sprite is left facing
  if (facing) {
    frogClasses.push("flipped");
  }
  const frogClass = frogClasses.join(" ");

  return (
    <>
      <div className="frog-wrapper h-20 w-20 m-2">
        <div className={frogClass} />
      </div>
    </>
  );
}

export default Frog;
