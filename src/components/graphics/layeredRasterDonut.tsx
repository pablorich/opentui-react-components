import { useRenderer } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { Text } from "../typography/text";

interface LayeredRasterDonutOptions {
  width: number;
  height: number;
  speed: number;
}

const chars = ".,-~:;=!*#$@";

export function LayeredRasterDonut({
  width = 60,
  height = 30,
  speed = 1,
}: Partial<LayeredRasterDonutOptions> = {}) {
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

    const segments = 24;
    const rings = 48;
    const r1 = 1;
    const r2 = 2;

    const vertices: {
      x: number;
      y: number;
      z: number;
      nx: number;
      ny: number;
      nz: number;
      u: number;
      v: number;
    }[] = [];
    const indices: number[] = [];

    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      const ct = Math.cos(theta);
      const st = Math.sin(theta);
      for (let i = 0; i <= rings; i++) {
        const phi = (i / rings) * Math.PI * 2;
        const cp = Math.cos(phi);
        const sp = Math.sin(phi);
        vertices.push({
          x: (r2 + r1 * ct) * cp,
          y: (r2 + r1 * ct) * sp,
          z: r1 * st,
          nx: ct * cp,
          ny: ct * sp,
          nz: st,
          u: j / segments,
          v: i / rings,
        });
      }
    }

    for (let j = 0; j < segments; j++) {
      for (let i = 0; i < rings; i++) {
        const p1 = j * (rings + 1) + i;
        const p2 = p1 + (rings + 1);
        indices.push(p1, p2, p1 + 1, p2, p2 + 1, p1 + 1);
      }
    }

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

    let A = 0;
    let B = 0;

    const renderFrame = () => {
      const zBuffer = new Float32Array(options.width * options.height).fill(
        -Infinity,
      );
      const frameBuffer = new Array(options.width * options.height).fill(" ");
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      for (let i = 0; i < indices.length; i += 3) {
        const idx0 = indices[i];
        const idx1 = indices[i + 1];
        const idx2 = indices[i + 2];
        if (idx0 === undefined || idx1 === undefined || idx2 === undefined)
          continue;

        const v0 = vertices[idx0];
        const v1 = vertices[idx1];
        const v2 = vertices[idx2];
        if (!v0 || !v1 || !v2) continue;

        const tri = [
          (() => {
            const y_ = v0.y * cosA - v0.z * sinA;
            const z_ = v0.y * sinA + v0.z * cosA;
            const x_ = v0.x * cosB + z_ * sinB;
            const finalZ = -v0.x * sinB + z_ * cosB + observerDistance;
            const ny_ = v0.ny * cosA - v0.nz * sinA;
            const nz_ = v0.ny * sinA + v0.nz * cosA;
            const nx_ = v0.nx * cosB + nz_ * sinB;
            const finalNZ = -v0.nx * sinB + nz_ * cosB;
            const ooz = 1 / finalZ;
            return {
              x: options.width / 2 + K1 * x_ * ooz,
              y: options.height / 2 + K2 * y_ * ooz,
              z: ooz,
              l: Math.max(0, (nx_ * 0 + ny_ * 1 + finalNZ * -1) / Math.sqrt(2)),
              u: v0.u,
              v: v0.v,
            };
          })(),
          (() => {
            const y_ = v1.y * cosA - v1.z * sinA;
            const z_ = v1.y * sinA + v1.z * cosA;
            const x_ = v1.x * cosB + z_ * sinB;
            const finalZ = -v1.x * sinB + z_ * cosB + observerDistance;
            const ny_ = v1.ny * cosA - v1.nz * sinA;
            const nz_ = v1.ny * sinA + v1.nz * cosA;
            const nx_ = v1.nx * cosB + nz_ * sinB;
            const finalNZ = -v1.nx * sinB + nz_ * cosB;
            const ooz = 1 / finalZ;
            return {
              x: options.width / 2 + K1 * x_ * ooz,
              y: options.height / 2 + K2 * y_ * ooz,
              z: ooz,
              l: Math.max(0, (nx_ * 0 + ny_ * 1 + finalNZ * -1) / Math.sqrt(2)),
              u: v1.u,
              v: v1.v,
            };
          })(),
          (() => {
            const y_ = v2.y * cosA - v2.z * sinA;
            const z_ = v2.y * sinA + v2.z * cosA;
            const x_ = v2.x * cosB + z_ * sinB;
            const finalZ = -v2.x * sinB + z_ * cosB + observerDistance;
            const ny_ = v2.ny * cosA - v2.nz * sinA;
            const nz_ = v2.ny * sinA + v2.nz * cosA;
            const nx_ = v2.nx * cosB + nz_ * sinB;
            const finalNZ = -v2.nx * sinB + nz_ * cosB;
            const ooz = 1 / finalZ;
            return {
              x: options.width / 2 + K1 * x_ * ooz,
              y: options.height / 2 + K2 * y_ * ooz,
              z: ooz,
              l: Math.max(0, (nx_ * 0 + ny_ * 1 + finalNZ * -1) / Math.sqrt(2)),
              u: v2.u,
              v: v2.v,
            };
          })(),
        ] as const;

        const minX = Math.floor(Math.min(tri[0].x, tri[1].x, tri[2].x));
        const maxX = Math.ceil(Math.max(tri[0].x, tri[1].x, tri[2].x));
        const minY = Math.floor(Math.min(tri[0].y, tri[1].y, tri[2].y));
        const maxY = Math.ceil(Math.max(tri[0].y, tri[1].y, tri[2].y));

        for (
          let py = Math.max(0, minY);
          py <= Math.min(options.height - 1, maxY);
          py++
        ) {
          for (
            let px = Math.max(0, minX);
            px <= Math.min(options.width - 1, maxX);
            px++
          ) {
            const den =
              (tri[1].y - tri[2].y) * (tri[0].x - tri[2].x) +
              (tri[2].x - tri[1].x) * (tri[0].y - tri[2].y);
            if (Math.abs(den) < 0.0001) continue;
            const w0 =
              ((tri[1].y - tri[2].y) * (px - tri[2].x) +
                (tri[2].x - tri[1].x) * (py - tri[2].y)) /
              den;
            const w1 =
              ((tri[2].y - tri[0].y) * (px - tri[2].x) +
                (tri[0].x - tri[2].x) * (py - tri[2].y)) /
              den;
            const w2 = 1 - w0 - w1;
            if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
              const z = w0 * tri[0].z + w1 * tri[1].z + w2 * tri[2].z;
              const o = px + options.width * py;
              if (z > (zBuffer[o] ?? 0)) {
                zBuffer[o] = z;
                const u = w0 * tri[0].u + w1 * tri[1].u + w2 * tri[2].u;
                const v = w0 * tri[0].v + w1 * tri[1].v + w2 * tri[2].v;
                const l = w0 * tri[0].l + w1 * tri[1].l + w2 * tri[2].l;
                frameBuffer[o] = getCharFromTexture(u, v, l);
              }
            }
          }
        }
      }

      setContent(
        frameBuffer.reduce(
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
