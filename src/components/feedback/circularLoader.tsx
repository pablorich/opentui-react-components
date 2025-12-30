import { useEffect, useState } from "react";

import { Text } from "../typography/text";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export interface CircularLoaderProps {
  speed?: number;
}

export function CircularLoader({ speed = 100 }: CircularLoaderProps = {}) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return <Text color="primary">{FRAMES[frameIndex]}</Text>;
}
