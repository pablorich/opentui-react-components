import { createContext, useState, useEffect, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { resolveTheme, type ThemeName } from "./index";
import type {
  ThemeConfig,
  ColorMode,
  ResolvedTheme as ResolvedThemeType,
} from "./types";

interface ThemeContextValue {
  theme: ResolvedThemeType;
  themeName: string | null;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  setTheme: (themeName: ThemeName) => Promise<void>;
}

const themeContext = createContext<ThemeContextValue | null>(null);

async function loadTheme(name: ThemeName): Promise<ThemeConfig> {
  const module = await import(`./themes/${name}.json`);
  return module.default;
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
  const [currentThemeConfig, setCurrentThemeConfig] =
    useState<ThemeConfig | null>(null);

  useEffect(() => {
    loadTheme(currentThemeName).then((res) => {
      setCurrentThemeConfig(res);
    });
  }, [currentThemeName]);

  const resolvedTheme = useMemo(() => {
    if (!currentThemeConfig) return null;
    return resolveTheme(currentThemeConfig, mode);
  }, [currentThemeConfig, mode]);

  const setTheme = async (name: ThemeName) => {
    setCurrentThemeName(name);
  };

  const value: ThemeContextValue = {
    theme: resolvedTheme || {
      defs: {},
      colors: {} as any,
      mode,
    },
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
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
