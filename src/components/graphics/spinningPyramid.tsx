import { useRenderer } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { Text } from "../typography/text";
import type { Edge, Face } from "./renderer3d";
import { Renderer3D } from "./renderer3d";
import type { Vec3 } from "./vec3";

type Axis = "x" | "y" | "z";

interface PyramidOptions {
  width: number;
  height: number;
  speed: number;
  axis: Axis;
  wireframe: boolean;
  edges: boolean;
  edgeChar: string;
  scale: number;
  desiredDist: number;
  xScale: number;
  yScale: number;
  yOffset: number;
  faceChars: string[];
  du: number;
  dv: number;
}

export function SpinningPyramid({
  width = 40,
  height = 20,
  speed = 0.8,
  axis = "y",
  wireframe = false,
  edges = true,
  edgeChar = "+",
  scale = 1.6,
  desiredDist = 4.4,
  xScale = 34.0,
  yScale = 16.0,
  yOffset = -4,
  faceChars = ["@", "#", "$", "*"],
  du = 0.02,
  dv = 0.02,
}: Partial<PyramidOptions> = {}) {
  const renderer = useRenderer();
  const [content, setContent] = useState("");
  const renderer3dRef = useRef<Renderer3D | null>(null);
  const optionsRef = useRef({
    width: Math.max(16, Math.floor(width)),
    height: Math.max(8, Math.floor(height)),
    speed,
    axis,
    wireframe,
    edges,
    edgeChar: edgeChar && edgeChar.length > 0 ? (edgeChar[0] ?? "+") : "+",
    scale,
    desiredDist,
    xScale,
    yScale,
    yOffset,
    faceChars:
      faceChars && faceChars.length > 0 ? faceChars : ["@", "#", "$", "*"],
    du,
    dv,
  });

  useEffect(() => {
    if (!renderer) return;

    const options = optionsRef.current;
    const vertices: Vec3[] = [
      [0.0, options.scale, 0.0],
      [-options.scale, -options.scale, -options.scale],
      [options.scale, -options.scale, -options.scale],
      [options.scale, -options.scale, options.scale],
      [-options.scale, -options.scale, options.scale],
    ];

    const faces: Face[] = [
      { vertices: [0, 1, 2], normal: [0, 0, 0] },
      { vertices: [0, 2, 3], normal: [0, 0, 0] },
      { vertices: [0, 3, 4], normal: [0, 0, 0] },
      { vertices: [0, 4, 1], normal: [0, 0, 0] },
    ];

    const edges: Edge[] = [
      { start: 0, end: 1 },
      { start: 0, end: 2 },
      { start: 0, end: 3 },
      { start: 0, end: 4 },
      { start: 1, end: 2 },
      { start: 2, end: 3 },
      { start: 3, end: 4 },
      { start: 4, end: 1 },
    ];

    const renderer3d = new Renderer3D(vertices, faces, edges, {
      width: options.width,
      height: options.height,
      scale: options.scale,
      desiredDist: options.desiredDist,
      xScale: options.xScale,
      yScale: options.yScale,
      yOffset: options.yOffset,
      axis: options.axis,
      du: options.du,
      dv: options.dv,
    });

    renderer3dRef.current = renderer3d;

    let theta = 0;

    const renderFrame = () => {
      theta += 0.05;
      renderer3d.rotate(theta);

      const rendered = renderer3d.renderToBuffer(
        optionsRef.current.edgeChar,
        optionsRef.current.faceChars,
        optionsRef.current.wireframe,
        optionsRef.current.edges,
      );

      setContent(rendered);
    };

    const interval = setInterval(renderFrame, 1000 / 60);

    return () => {
      clearInterval(interval);
      renderer3dRef.current = null;
    };
  }, [renderer]);

  return <Text>{content}</Text>;
}
