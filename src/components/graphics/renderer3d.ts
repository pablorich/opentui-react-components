import { FrameBuffer } from "./frameBuffer";
import type { Vec3 } from "./vec3";
import { centroid3, dot3, norm3, rotatePoint } from "./vec3";

type Axis = "x" | "y" | "z";

export interface Renderer3DOptions {
  width: number;
  height: number;
  scale: number;
  desiredDist: number;
  xScale: number;
  yScale: number;
  yOffset: number;
  axis: Axis;
  du: number;
  dv: number;
}

export interface Face {
  vertices: [number, number, number];
  normal: Vec3;
}

export interface Edge {
  start: number;
  end: number;
}

export class Renderer3D {
  private vertices: Vec3[];
  private faces: Face[];
  private edges: Edge[];
  private centroid: Vec3;
  private lightDir: Vec3;
  private options: Renderer3DOptions;
  private theta: number = 0;

  constructor(
    vertices: Vec3[],
    faces: Face[],
    edges: Edge[],
    options: Renderer3DOptions,
  ) {
    this.vertices = vertices;
    this.faces = faces;
    this.edges = edges;
    this.options = options;
    this.centroid = centroid3(vertices);
    this.lightDir = norm3([0.0, 1.0, -1.0]);
  }

  rotate(angle: number): void {
    this.theta = angle;
  }

  private rotateNormal(normal: Vec3): Vec3 {
    const { axis } = this.options;
    const c = Math.cos(this.theta);
    const s = Math.sin(this.theta);
    const [nx, ny, nz] = normal;

    if (axis === "y") return [nx * c + nz * s, ny, -nx * s + nz * c];
    if (axis === "x") return [nx, ny * c - nz * s, ny * s + nz * c];
    return [nx * c - ny * s, nx * s + ny * c, nz];
  }

  private project(point: Vec3): [number, number, number] {
    const { width, height, desiredDist, xScale, yScale, yOffset } =
      this.options;
    const c = Math.cos(this.theta);
    const s = Math.sin(this.theta);
    const [x, y, z] = point;

    const cz = -this.centroid[0] * s + this.centroid[2] * c;
    const offset = desiredDist - cz;
    const zt = z + offset;

    if (zt <= 0) return [-1, -1, 0];

    const invz = 1 / zt;
    const px = Math.floor(width / 2 + xScale * x * invz);
    const py = Math.floor(height / 2 - yScale * y * invz + yOffset);

    return [px, py, invz];
  }

  renderFaces(fb: FrameBuffer, wireframe: boolean): void {
    if (wireframe) return;

    const { du, dv } = this.options;

    for (const face of this.faces) {
      for (let u = 0; u <= 1.0; u += du) {
        for (let v = 0; u + v <= 1.0; v += dv) {
          const w = 1.0 - u - v;
          const [i0, i1, i2] = face.vertices;
          const v0 = this.vertices[i0] ?? [0, 0, 0];
          const v1 = this.vertices[i1] ?? [0, 0, 0];
          const v2 = this.vertices[i2] ?? [0, 0, 0];

          const point: Vec3 = [
            w * v0[0] + u * v1[0] + v * v2[0],
            w * v0[1] + u * v1[1] + v * v2[1],
            w * v0[2] + u * v1[2] + v * v2[2],
          ];

          const rotated = rotatePoint(point, this.options.axis, this.theta);
          const [px, py, invz] = this.project(rotated);

          const normal = this.rotateNormal(face.normal);
          const luminance = Math.max(0, dot3(normal, this.lightDir));

          fb.setPixel(px, py, invz, this.faces.indexOf(face), luminance);
        }
      }
    }
  }

  renderEdges(fb: FrameBuffer): void {
    for (const edge of this.edges) {
      const va = this.vertices[edge.start] ?? [0, 0, 0];
      const vb = this.vertices[edge.end] ?? [0, 0, 0];

      for (let t = 0; t <= 1.0; t += 0.005) {
        const point: Vec3 = [
          va[0] + (vb[0] - va[0]) * t,
          va[1] + (vb[1] - va[1]) * t,
          va[2] + (vb[2] - va[2]) * t,
        ];

        const rotated = rotatePoint(point, this.options.axis, this.theta);
        const [px, py, invz] = this.project(rotated);

        fb.setPixel(px, py, invz, 0, 0, true);
      }
    }
  }

  renderToBuffer(
    edgeChar: string,
    faceChars: string[],
    wireframe: boolean,
    renderEdges: boolean,
  ): string {
    const fb = new FrameBuffer(this.options.width, this.options.height);
    this.renderFaces(fb, wireframe);
    if (renderEdges || wireframe) {
      this.renderEdges(fb);
    }
    return fb.renderToString(edgeChar, faceChars);
  }
}
