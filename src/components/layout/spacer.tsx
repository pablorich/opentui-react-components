import { useContext } from "react";
import { useTheme } from "../../theme/provider";
import { FlexDirectionContext } from "./container";

export interface HalfSpacerProps {
  variant?:
    | "light"
    | "medium"
    | "heavy"
    | "upperHalf"
    | "lowerHalf"
    | "leftHalf"
    | "rightHalf";
  colorKey?: "borderSubtle" | "border";
  bgColor?: string;
}

export const HALF_BLOCK = {
  light: "░",
  medium: "▒",
  heavy: "▓",
  upperHalf: "▀",
  lowerHalf: "▄",
  leftHalf: "▌",
  rightHalf: "▐",
};

export function HalfSpacer({
  variant = "light",
  colorKey = "borderSubtle",
  bgColor,
}: HalfSpacerProps) {
  const { theme } = useTheme();

  const backgroundColor = bgColor ?? theme.colors[colorKey];

  return (
    <box height={1} style={{ backgroundColor }}>
      <text>{HALF_BLOCK[variant]}</text>
    </box>
  );
}

export interface SpacerProps {
  size?: number;
}

export function Spacer({ size = 1 }: SpacerProps) {
  const flexDirection = useContext(FlexDirectionContext);
  const isRow = flexDirection === "row";

  return <box {...(isRow ? { width: size } : { height: size })} />;
}
