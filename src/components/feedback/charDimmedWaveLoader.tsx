import { useEffect, useMemo, useState } from "react";

import { FlexRow } from "../layout/container";
import { Text } from "../typography/text";

export interface CharDimmedWaveLoaderProps {
  length?: number;
  speed?: number;
  color?: "primary" | "accent" | "secondary";
}

export function CharDimmedWaveLoader({
  length = 8,
  speed = 50,
  color = "primary",
}: CharDimmedWaveLoaderProps = {}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalSteps = length + 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        const newPos = prevStep + direction;

        if (newPos >= totalSteps - 1) {
          setDirection(-1);
          return length;
        }
        if (newPos <= -4) {
          setDirection(1);
          return -4;
        }
        return newPos;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [length, speed, direction, totalSteps]);

  const frame = useMemo(() => {
    return Array.from({ length }, (_, i) => {
      const dist = direction === 1 ? step - i : i - step;
      if (dist === 0) return { char: "█", opacity: 1 };
      if (dist === 1) return { char: "▓", opacity: 1 };
      if (dist === 2) return { char: "▒", opacity: 1 };
      if (dist === 3) return { char: "░", opacity: 1 };

      return { char: "▪", opacity: 0.25 };
    });
  }, [step, length, direction]);

  return (
    <FlexRow style={{ padding: 0 }}>
      {frame.map((square, i) => {
        const key = `pos-${step}-idx-${i}`;
        return (
          <Text key={key} color={color} style={{ opacity: square.opacity }}>
            {square.char}
          </Text>
        );
      })}
    </FlexRow>
  );
}
