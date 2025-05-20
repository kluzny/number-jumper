import "../assets/styles/frog.css";

function Frog(facing: { facing: boolean }) {
  const { facing: isFacingRight } = facing;
  const frogClass = isFacingRight ? "frog idle flipped" : "frog idle"; // sprite is left facing
  return (
    <>
      <div className="frog h-20 w-20 m-2 bg-green-400">
        <div className={frogClass} />
      </div>
    </>
  );
}

export default Frog;
