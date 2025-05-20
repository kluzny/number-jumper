import Spritesheet from "react-responsive-spritesheet";
import frogIdle from "../assets/sprites/frog_idle.png";

function Frog() {
  return (
    <>
      <div className="frog h-20 w-20 m-2 bg-green-400">
        <Spritesheet
          image={frogIdle}
          widthFrame={32}
          heightFrame={32}
          steps={2}
          fps={4}
          direction={"forward"}
          loop={true}
          autoplay={true}
        />
      </div>
    </>
  );
}

export default Frog;
