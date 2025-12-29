import { useKeyboard } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { Dialog, FlexCol, Text } from "./components";
import { type ThemeName, themeNames } from "./theme";
import { useTheme } from "./theme/provider";

export interface ThemeSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelectorDialog({
  isOpen,
  onClose,
}: ThemeSelectorDialogProps) {
  const { theme, themeName, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(
    themeNames.indexOf(themeName),
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
    <Dialog>
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
    </Dialog>
  );
}
