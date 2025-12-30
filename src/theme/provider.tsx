import type { ReactNode } from "react";
import { createContext, use, useMemo, useState } from "react";
import { resolveTheme, type ThemeName } from "./index";
import ayuTheme from "./themes/ayu.json";
import catppuccinTheme from "./themes/catppuccin.json";
import draculaTheme from "./themes/dracula.json";
import githubTheme from "./themes/github.json";
import monokaiTheme from "./themes/monokai.json";
import nordTheme from "./themes/nord.json";
import type {
  ColorMode,
  ResolvedTheme as ResolvedThemeType,
  ThemeConfig,
} from "./types";

interface ThemeContextValue {
  theme: ResolvedThemeType;
  themeName: ThemeName;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  setTheme: (themeName: ThemeName) => void;
}

const themeContext = createContext<ThemeContextValue | null>(null);

const themeMap: Record<ThemeName, ThemeConfig> = {
  github: githubTheme,
  ayu: ayuTheme,
  catppuccin: catppuccinTheme,
  dracula: draculaTheme,
  monokai: monokaiTheme,
  nord: nordTheme,
};

function loadTheme(name: ThemeName): ThemeConfig {
  return themeMap[name];
}

export interface ThemeProviderProps {
  themeName?: ThemeName;
  defaultMode?: ColorMode;
  children: ReactNode;
}

export function ThemeProvider({
  themeName = "github",
  defaultMode = "dark",
  children,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ColorMode>(defaultMode);
  const [currentThemeName, setCurrentThemeName] =
    useState<ThemeName>(themeName);

  const currentThemeConfig = useMemo(() => {
    return loadTheme(currentThemeName);
  }, [currentThemeName]);

  const resolvedTheme = useMemo(() => {
    return resolveTheme(currentThemeConfig, mode);
  }, [currentThemeConfig, mode]);

  const setTheme = (name: ThemeName) => {
    setCurrentThemeName(name);
  };

  const value: ThemeContextValue = {
    theme: resolvedTheme,
    themeName: currentThemeName,
    mode,
    setMode,
    setTheme,
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = use(themeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
