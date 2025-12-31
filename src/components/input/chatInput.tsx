import type { TextareaRenderable } from "@opentui/core";
import type { ReactNode } from "react";
import { EmptyBorder } from "../../component/border";
import { useTheme } from "../../theme/provider";

export interface ChatInputProps {
  textareaRef: React.RefObject<TextareaRenderable | null>;
  variant?: "default" | "minimal";
  placeholder?: string;
  children?: ReactNode;
}

export function ChatInput({
  textareaRef,
  variant = "default",
  placeholder,
  children,
}: ChatInputProps) {
  const { theme } = useTheme();

  if (theme === null) return null;

  const customBorderChars = {
    ...EmptyBorder,
    vertical: "┃",
  };

  const minimalCustomBorderChars = {
    ...EmptyBorder,
    vertical: "│",
  };

  const borderChars =
    variant === "default" ? customBorderChars : minimalCustomBorderChars;
  const borderColor =
    variant === "default" ? theme.colors.accent : theme.colors.textMuted;

  return (
    <>
      <box
        flexDirection="row"
        // width="100%"
        style={{
          border: ["left"],
          borderColor,
        }}
        customBorderChars={borderChars}
      >
        <box
          style={{
            backgroundColor: theme.colors.backgroundElement,
            width: "100%",
          }}
        >
          <box
            style={{
              padding: 1,
              paddingLeft: 2,
            }}
          >
            <textarea
              ref={textareaRef}
              focused
              minHeight={1}
              maxHeight={6}
              focusedBackgroundColor={theme.colors.backgroundElement}
              cursorColor={theme.colors.text}
            />
          </box>
          {children && <box paddingLeft={2}>{children}</box>}
        </box>
      </box>
      {/* Half height padding bottom if theres children*/}
      {children && (
        <box
          height={1}
          border={["left"]}
          borderColor={borderColor}
          customBorderChars={{
            ...EmptyBorder,
            vertical: "╹",
          }}
        >
          <box
            height={1}
            border={["bottom"]}
            borderColor={theme.colors.backgroundElement}
            customBorderChars={{
              ...EmptyBorder,
              horizontal: "▀",
            }}
          />
        </box>
      )}
    </>
  );
}
