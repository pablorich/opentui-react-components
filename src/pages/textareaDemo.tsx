import { RGBA, type TextareaRenderable } from "@opentui/core";
import { useRef } from "react";
const theme = {
  background: "#282A36",
  backgroundElement: "#44475A",
  text: "#FFFFFF",
  textSecondary: "#888888",
  accentPrimary: "#FF69B4",
  accentSecondary: "#f0ff69ff",
};
export function TextAreaDemo() {
  return (
    <box backgroundColor={"#633030ff"}>
      {/* <textarea
        focused
        cursorColor={RGBA.fromHex("#633030ff")}
        textColor={"#633030ffsts"}
        cursorStyle={{ style: "block", blinking: true }}
      /> */}
      <box border={true} height={3}>
        <input
          focused
          value="tested"
          width={55}
          backgroundColor={"#fff"}
          cursorColor={"#fff"}
        />
      </box>
      <box backgroundColor={theme.background}>
        <text bg="white" fg="gray">
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
        </text>
        <text bg={"black"} fg={"#ffffc0ff"}>
          test
        </text>
      </box>
    </box>
  );
}
