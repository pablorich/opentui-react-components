import { useEffect, useMemo, useState } from "react";

import { useTheme } from "../../theme/provider";
import { FlexRow } from "../layout/container";

export interface ColorDimmedWaveLoaderProps {
  length?: number;
  speed?: number;
}

export function ColorDimmedWaveLoader({
  length = 8,
  speed = 50,
}: ColorDimmedWaveLoaderProps = {}) {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const totalSteps = length + 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + direction;

        if (nextStep >= totalSteps - 1) {
          setDirection(-1);
          return length;
        }
        if (nextStep <= -4) {
          setDirection(1);
          return -4;
        }
        return nextStep;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, totalSteps, speed, length]);

  const frame = useMemo(() => {
    return Array.from({ length }, (_, i) => {
      const dist = direction === 1 ? step - i : i - step;
      if (dist === 0) return { char: "■", opacity: 1 };
      if (dist === 1) return { char: "■", opacity: 0.75 };
      if (dist === 2) return { char: "■", opacity: 0.5 };
      if (dist === 3) return { char: "■", opacity: 0.25 };

      return { char: "▪", opacity: 0.25 };
    });
  }, [step, length, direction]);

  return (
    <FlexRow style={{ padding: 0 }}>
      {frame.map((square, i) => {
        const key = `trail-idx-${i}`;
        return (
          <text
            key={key}
            style={{ fg: theme.colors.primary, opacity: square.opacity }}
          >
            {square.char}
          </text>
        );
      })}
    </FlexRow>
  );
}
