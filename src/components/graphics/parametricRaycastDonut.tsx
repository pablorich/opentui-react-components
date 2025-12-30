import { useRenderer } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { Text } from "../typography/text";

interface ParametricRaycastDonutOptions {
  width: number;
  height: number;
  speed: number;
}

const chars = ".,-~:;=!*#$@";

export function ParametricRaycastDonut({
  width = 60,
  height = 30,
  speed = 1,
}: Partial<ParametricRaycastDonutOptions> = {}) {
  const renderer = useRenderer();
  const [content, setContent] = useState("");
  const optionsRef = useRef({
    width: Math.max(16, Math.floor(width)),
    height: Math.max(8, Math.floor(height)),
    speed,
  });

  useEffect(() => {
    if (!renderer) return;

    const options = optionsRef.current;
    const K1 = 30;
    const K2 = 15;
    const observerDistance = 5;

    let A = 0;
    let B = 0;

    const getCharFromTexture = (
      u: number,
      v: number,
      light: number,
    ): string => {
      if (light <= 0) return " ";

      const intensity =
        0.5 + 0.5 * Math.sin(u * Math.PI * 4) * Math.cos(v * Math.PI * 4);
      const combined = intensity * light;
      const charIdx = Math.max(
        0,
        Math.min(chars.length - 1, Math.floor(combined * (chars.length - 1))),
      );
      return chars[charIdx] ?? " ";
    };

    const renderFrame = () => {
      const z = new Float32Array(options.width * options.height).fill(0);
      const b = new Array(options.width * options.height).fill(" ");
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j);
        const st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i);
          const cp = Math.cos(i);
          const h = ct + 2;
          const D = 1 / (sp * h * sinA + st * cosA + observerDistance);
          const t = sp * h * cosA - st * sinA;
          const x = Math.floor(
            options.width / 2 + K1 * D * (cp * h * cosB - t * sinB),
          );
          const y = Math.floor(
            options.height / 2 + K2 * D * (cp * h * sinB + t * cosB),
          );
          const o = x + options.width * y;
          const N =
            (st * sinA - sp * ct * cosA) * cosB -
            sp * ct * sinA -
            st * cosA -
            cp * ct * sinB;

          if (
            y >= 0 &&
            y < options.height &&
            x >= 0 &&
            x < options.width &&
            D > (z[o] ?? 0)
          ) {
            z[o] = D;
            b[o] = getCharFromTexture(j / 6.28, i / 6.28, N);
          }
        }
      }

      setContent(
        b.reduce(
          (acc, char, i) =>
            acc + (i % options.width === 0 && i > 0 ? "\n" : "") + char,
          "",
        ),
      );
      A += 0.05 * options.speed;
      B += 0.025 * options.speed;
    };

    const interval = setInterval(renderFrame, 1000 / 60);

    return () => clearInterval(interval);
  }, [renderer]);

  return <Text>{content}</Text>;
}
