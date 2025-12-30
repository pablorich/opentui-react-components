export interface PixelData {
  faceIndex: number;
  luminance: number;
  isEdge: boolean;
}

export class FrameBuffer {
  private width: number;
  private height: number;
  private faceBuffer: number[];
  private lumBuffer: number[];
  private zBuffer: number[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.faceBuffer = Array(width * height).fill(-1);
    this.lumBuffer = Array(width * height).fill(0);
    this.zBuffer = Array(width * height).fill(0);
  }

  clear(): void {
    this.faceBuffer.fill(-1);
    this.lumBuffer.fill(0);
    this.zBuffer.fill(0);
  }

  setPixel(
    x: number,
    y: number,
    invZ: number,
    faceIndex: number,
    luminance: number,
    isEdge = false,
  ): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx = x + y * this.width;

    if (isEdge) {
      if (invZ > (this.zBuffer[idx] ?? 0)) {
        this.zBuffer[idx] = invZ + 1e-6;
        this.faceBuffer[idx] = -2;
      }
      return;
    }

    if (luminance <= 0) return;
    if (invZ <= (this.zBuffer[idx] ?? 0)) return;
    this.zBuffer[idx] = invZ;
    this.lumBuffer[idx] = luminance;
    this.faceBuffer[idx] = faceIndex;
  }

  getPixel(x: number, y: number): PixelData | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    const idx = x + y * this.width;
    const faceIndex = this.faceBuffer[idx] ?? -1;
    return {
      faceIndex,
      luminance: this.lumBuffer[idx] ?? 0,
      isEdge: faceIndex === -2,
    };
  }

  renderToString(
    edgeChar: string,
    faceChars: string[],
    emptyChar = " ",
  ): string {
    const rows: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        const pixel = this.getPixel(x, y);
        if (!pixel) {
          line += emptyChar;
          continue;
        }

        if (pixel.isEdge) {
          line += edgeChar;
        } else if (pixel.faceIndex < 0) {
          line += emptyChar;
        } else {
          const faceIndex = pixel.faceIndex % faceChars.length;
          line += faceChars[faceIndex] || "#";
        }
      }
      rows.push(line);
    }
    return rows.join("\n");
  }
}
