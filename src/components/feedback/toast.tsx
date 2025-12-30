import { TextAttributes } from "@opentui/core";
import { EmptyBorder } from "../../component/border";
import { Container, FlexCol, Spacer } from "../../components";
import { useTheme } from "../../theme/provider";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  variant: ToastVariant;
  title?: string;
  message: string;
  position?: "center" | "left" | "right";
  width?: number;
}
const customBorderChars = {
  ...EmptyBorder,
  vertical: "┃",
};

export function Toast({
  variant,
  title,
  message,
  position,
  width = 20,
}: ToastProps) {
  const { theme } = useTheme();

  const colorKey = variant as keyof typeof theme.colors;
  const fg = theme.colors[colorKey];

  return (
    <Container
      variant="panel"
      padding={1}
      style={{
        borderStyle: "single",
        minWidth: width,
        maxWidth: width ?? 60,
        border: ["left", "right"],
        borderColor: fg,
      }}
      props={{ customBorderChars }}
    >
      <FlexCol
        style={
          position === "center"
            ? { alignItems: "center" }
            : position === "right"
              ? { alignItems: "flex-end" }
              : { alignItems: "flex-start" }
        }
      >
        {title && (
          <>
            <text style={{ fg, attributes: TextAttributes.BOLD }}>{title}</text>
            <Spacer size={1} />
          </>
        )}
        <text fg={theme.colors.text}>{message}</text>
      </FlexCol>
    </Container>
  );
}

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  duration?: number;
  position?: ToastPosition;
  contentPosition?: "center" | "left" | "right";
  width?: number;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
  position: ToastPosition;
  duration: number;
  createdAt: number;
  contentPosition?: "center" | "left" | "right";
  width?: number;
}
