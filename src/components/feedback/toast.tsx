import { TextAttributes } from "@opentui/core";
import { EmptyBorder } from "../../component/border";
import { Container, FlexCol, Spacer } from "../../components";
import { useTheme } from "../../theme/provider";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  variant: ToastVariant;
  title?: string;
  message: string;
}
const customBorderChars = {
  ...EmptyBorder,
  vertical: "┃",
};

export function Toast({ variant, title, message }: ToastProps) {
  const { theme } = useTheme();

  const colorKey = variant as keyof typeof theme.colors;
  const fg = theme.colors[colorKey];

  return (
    <Container
      variant="panel"
      padding={1}
      style={{
        borderStyle: "single",
        minWidth: 40,
        maxWidth: 60,
        border: ["left", "right"],
        borderColor: fg,
      }}
      props={{ customBorderChars }}
    >
      <FlexCol>
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
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
  position: ToastPosition;
  duration: number;
  createdAt: number;
}
