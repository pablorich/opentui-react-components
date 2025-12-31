import type { TextareaRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useRef, useState } from "react";
import { ChatInput } from "../components";
import { useTheme } from "../theme/provider";

export function OpenClone() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<TextareaRenderable>(null);
  const { theme } = useTheme();

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
        backgroundColor: theme.colors.background,
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
        {messages.map((message, _index) => (
          <box key={message} marginBottom={1}>
            <text>{message}</text>
          </box>
        ))}
      </box>
      <ChatInput textareaRef={textareaRef} />
      <box
        style={{
          alignItems: "flex-end",
          marginBottom: 1,
        }}
      >
        <text>
          <span style={{ fg: theme.colors.text }}>tab </span>
          <span style={{ fg: theme.colors.textMuted }}>switch agent </span>
          <span style={{ fg: theme.colors.text }}>ctrl+p </span>
          <span style={{ fg: theme.colors.textMuted }}>commands</span>
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
