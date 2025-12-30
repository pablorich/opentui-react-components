import type { TextProps } from "@opentui/react";
import type { ReactNode } from "react";
import { useTheme } from "../../theme/provider";

export interface ExtendedTextProps {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "text"
    | "textMuted";
  children?: ReactNode;
  style?: TextProps;
}

export function Text({ color = "text", children, style }: ExtendedTextProps) {
  const { theme } = useTheme();

  const colorKey = color as keyof typeof theme.colors;
  const fg = theme.colors[colorKey];

  return <text style={{ ...style, fg }}>{children}</text>;
}
