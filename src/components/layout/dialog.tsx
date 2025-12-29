import { RGBA } from "@opentui/core";

export interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return (
    <box
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: RGBA.fromInts(0, 0, 0, 150),
      }}
    >
      {children}
    </box>
  );
}
