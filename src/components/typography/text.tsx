import type { ReactNode } from "react";
import { useTheme } from "../../theme/provider";

export interface TextProps {
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
}

export function Text({ color = "text", children }: TextProps) {
  const { theme } = useTheme();

  const colorKey = color as keyof typeof theme.colors;
  const fg = theme.colors[colorKey];

  return <text style={{ fg }}>{children}</text>;
}
