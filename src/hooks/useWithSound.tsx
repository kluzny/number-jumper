// https://www.letsbuildui.dev/articles/working-with-sound-in-react/

import { useRef, useEffect } from "react";

export const useWithSound = (audioSource: string, volume: number = 1.0) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
    soundRef.current.volume = volume;
  }, []);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const pauseSound = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  return {
    playSound,
    pauseSound,
  };
};
