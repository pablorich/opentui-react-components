import type {
  SelectOption,
  TabSelectOption,
  TextareaRenderable,
} from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { EmptyBorder } from "../component/border";

const theme = {
  background: "#282A36",
  backgroundElement: "#44475A",
  text: "#ffffff",
  textSecondary: "#888888",
  accentPrimary: "#FF69B4",
  accentSecondary: "#f0ff69ff",
};

const customBorderChars = {
  ...EmptyBorder,
  vertical: "┃",
  bottomLeft: "p",
};

export function OpenClone() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<TextareaRenderable>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  useKeyboard((key) => {
    if (key.name === "return") {
      handleSubmit();
    }
  });

  return (
    <box
      style={{
        backgroundColor: theme.background,
        height: "100%",
        width: "100%",
        flexDirection: "column",
        paddingLeft: 2,

        paddingRight: 2,
      }}
    >
      <box
        style={{
          flexGrow: 1,
          flexDirection: "column",
          padding: 1,
        }}
      >
        {messages.map((message, index) => (
          <box key={index} marginBottom={1}>
            <text>{message}</text>
          </box>
        ))}
      </box>
      <box
        flexDirection="row"
        width="100%"
        // minHeight={4}
        style={{
          border: ["left"],
          borderColor: theme.accentPrimary,
        }}
        customBorderChars={customBorderChars}
      >
        <box
          style={{
            backgroundColor: theme.backgroundElement,
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
              focusedBackgroundColor={theme.backgroundElement}
              cursorColor={theme.text}
            />
          </box>
          <box>
            <text style={{ marginLeft: 2, marginBottom: 0 }}>
              <span fg={theme.accentPrimary}>Build </span>
              Agent 007
            </text>
          </box>
        </box>
      </box>
      {/* Trick to have half height padding*/}
      <box
        height={1}
        border={["left"]}
        borderColor={theme.accentPrimary}
        customBorderChars={{
          ...EmptyBorder,
          vertical: "╹",
        }}
      >
        <box
          height={1}
          border={["bottom"]}
          borderColor={theme.backgroundElement}
          customBorderChars={{
            ...EmptyBorder,
            horizontal: "▀",
          }}
        />
      </box>
      <box
        style={{
          alignItems: "flex-end",
          marginBottom: 1,
        }}
      >
        <text>
          <span style={{ fg: theme.text }}>tab </span>
          <span style={{ fg: theme.textSecondary }}>switch agent </span>
          <span style={{ fg: theme.text }}>ctrl+p </span>
          <span style={{ fg: theme.textSecondary }}>commands</span>
        </text>
      </box>
      <box
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          margin: 1,
          marginTop: 0,
        }}
      >
        <text>~\Documents\opentui-playground:master</text>
        <text>/status</text>
      </box>
    </box>
  );
}
