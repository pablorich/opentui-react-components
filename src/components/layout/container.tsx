import type { BoxProps } from "@opentui/react";
import { useTheme } from "../../theme/provider";

export interface ContainerProps {
  variant?: "default" | "panel" | "transparent";
  padding?: number;
  children?: React.ReactNode;
  style?: BoxProps;
  scrollable?: boolean;
}

export function Container({
  variant = "default",
  padding = 0,
  children,
  style,
  scrollable = false,
}: ContainerProps) {
  const { theme } = useTheme();
  if (theme === null) return;

  const backgroundColor =
    variant === "default"
      ? "background"
      : variant === "panel"
        ? "backgroundPanel"
        : undefined;

  const bg = backgroundColor ? theme.colors[backgroundColor] : "transparent";

  const content = (
    <box style={{ backgroundColor: bg, padding, ...style }}>{children}</box>
  );

  if (scrollable) {
    return <scrollbox>{content}</scrollbox>;
  }
  return content;
}

export function FlexRow({ variant, padding, children, style }: ContainerProps) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === "default"
      ? "background"
      : variant === "panel"
        ? "backgroundPanel"
        : undefined;

  const bg = backgroundColor ? theme.colors[backgroundColor] : "transparent";

  return (
    <box
      style={{ backgroundColor: bg, padding, flexDirection: "row", ...style }}
    >
      {children}
    </box>
  );
}

export function FlexCol({ variant, padding, children, style }: ContainerProps) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === "default"
      ? "background"
      : variant === "panel"
        ? "backgroundPanel"
        : undefined;

  const bg = backgroundColor ? theme.colors[backgroundColor] : "transparent";

  return (
    <box
      style={{
        backgroundColor: bg,
        padding,
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </box>
  );
}
