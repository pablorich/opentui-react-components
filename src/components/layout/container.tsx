import type { BoxProps } from "@opentui/react";
import { createContext } from "react";
import { useTheme } from "../../theme/provider";

type FlexDirection = "row" | "column" | null;

const FlexDirectionContext = createContext<FlexDirection>(null);

export interface ContainerProps {
  variant?: "default" | "panel" | "transparent";
  padding?: number;
  children?: React.ReactNode;
  style?: BoxProps;
  scrollable?: boolean;
  props?: BoxProps;
}

export function Container({
  variant = "default",
  padding = 0,
  children,
  style,
  scrollable = false,
  props,
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
    <box style={{ backgroundColor: bg, padding, ...style }} {...props}>
      {children}
    </box>
  );

  if (scrollable) {
    return <scrollbox>{content}</scrollbox>;
  }
  return content;
}

export function FlexRow(props: ContainerProps) {
  const { children, ...rest } = props;
  return (
    <FlexDirectionContext.Provider value="row">
      <Container {...rest} style={{ ...rest.style, flexDirection: "row" }}>
        {children}
      </Container>
    </FlexDirectionContext.Provider>
  );
}

export function FlexCol(props: ContainerProps) {
  const { children, ...rest } = props;
  return (
    <FlexDirectionContext.Provider value="column">
      <Container {...rest} style={{ ...rest.style, flexDirection: "column" }}>
        {children}
      </Container>
    </FlexDirectionContext.Provider>
  );
}

export { FlexDirectionContext };
