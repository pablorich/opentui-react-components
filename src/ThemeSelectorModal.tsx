import { useState, useRef, useEffect } from "react";
import { useKeyboard } from "@opentui/react";
import { FlexCol, Text } from "./components";
import { useTheme } from "./theme/provider";
import { type ThemeName, themeNames } from "./theme";
import { RGBA } from "@opentui/core";

export interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelectorModal({
  isOpen,
  onClose,
}: ThemeSelectorModalProps) {
  const { theme, themeName, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(
    themeNames.findIndex((th) => th === themeName)
  );
  const originalThemeNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen && !originalThemeNameRef.current) {
      originalThemeNameRef.current = themeName;
    }
    if (!isOpen) {
      originalThemeNameRef.current = null;
      setSelectedIndex(0);
    }
  }, [isOpen, themeName]);

  useKeyboard((key) => {
    if (!isOpen) return;

    if (key.name === "escape") {
      if (originalThemeNameRef.current) {
        const originalThemeName = originalThemeNameRef.current as ThemeName;
        setTheme(originalThemeName);
      }
      onClose();
    }
    if (key.name === "up") {
      setSelectedIndex((prev) => {
        const newIndex = (prev - 1 + themeNames.length) % themeNames.length;
        const newThemeName = themeNames[newIndex];
        if (newThemeName !== undefined) setTheme(newThemeName);
        return newIndex;
      });
    }
    if (key.name === "down") {
      setSelectedIndex((prev) => {
        const newIndex = (prev + 1) % themeNames.length;
        const newThemeName = themeNames[newIndex];
        if (newThemeName !== undefined) setTheme(newThemeName);
        return newIndex;
      });
    }
    if (key.name === "return") {
      originalThemeNameRef.current = null;
      onClose();
    }
  });

  if (!isOpen || !theme) return null;

  return (
    <box
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: RGBA.fromInts(0, 0, 0, 150),
      }}
    >
      <FlexCol padding={1} variant="panel" style={{ minWidth: 20 }}>
        <Text color="primary">Select Theme</Text>
        {themeNames.map((name, index) => {
          const isSelected = index === selectedIndex;
          const isOriginal = originalThemeNameRef.current === name;

          return (
            <FlexCol
              key={name}
              style={{
                backgroundColor: isSelected
                  ? theme.colors.borderActive
                  : "transparent",
                padding: 0,
              }}
            >
              <Text color={"text"}>
                {" "}
                {isOriginal ? "● " : "  "}
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
            </FlexCol>
          );
        })}
        <Text color="textMuted">Esc to close</Text>
      </FlexCol>
    </box>
  );
}
