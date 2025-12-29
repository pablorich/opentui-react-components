import type {
  ThemeColors,
  ThemeConfig,
  ResolvedTheme,
  ColorMode,
} from "./types";

// export const githubTheme: ThemeConfig = {
//   defs: {
//     darkBg: "#0d1117",
//     darkBgAlt: "#010409",
//     darkBgPanel: "#6799e0ff",
//     darkFg: "#c9d1d9",
//     darkFgMuted: "#8b949e",
//     darkBlue: "#58a6ff",
//     darkGreen: "#3fb950",
//     darkRed: "#f85149",
//     darkOrange: "#d29922",
//     darkPurple: "#bc8cff",
//     darkPink: "#ff7b72",
//     darkYellow: "#e3b341",
//     darkCyan: "#39c5cf",
//     lightBg: "#ffffff",
//     lightBgAlt: "#f6f8fa",
//     lightBgPanel: "#f0f3f6",
//     lightFg: "#24292f",
//     lightFgMuted: "#57606a",
//     lightBlue: "#0969da",
//     lightGreen: "#1a7f37",
//     lightRed: "#cf222e",
//     lightOrange: "#bc4c00",
//     lightPurple: "#8250df",
//     lightPink: "#bf3989",
//     lightYellow: "#9a6700",
//     lightCyan: "#1b7c83",
//   },
//   theme: {
//     primary: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     secondary: {
//       dark: "darkPurple",
//       light: "lightPurple",
//     },
//     accent: {
//       dark: "darkCyan",
//       light: "lightCyan",
//     },
//     error: {
//       dark: "darkRed",
//       light: "lightRed",
//     },
//     warning: {
//       dark: "darkYellow",
//       light: "lightYellow",
//     },
//     success: {
//       dark: "darkGreen",
//       light: "lightGreen",
//     },
//     info: {
//       dark: "darkOrange",
//       light: "lightOrange",
//     },
//     text: {
//       dark: "darkFg",
//       light: "lightFg",
//     },
//     textMuted: {
//       dark: "darkFgMuted",
//       light: "lightFgMuted",
//     },
//     background: {
//       dark: "darkBg",
//       light: "lightBg",
//     },
//     backgroundPanel: {
//       dark: "darkBgAlt",
//       light: "lightBgAlt",
//     },
//     backgroundElement: {
//       dark: "darkBgPanel",
//       light: "lightBgPanel",
//     },
//     border: {
//       dark: "#30363d",
//       light: "#d0d7de",
//     },
//     borderActive: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     borderSubtle: {
//       dark: "#21262d",
//       light: "#d8dee4",
//     },
//     diffAdded: {
//       dark: "darkGreen",
//       light: "lightGreen",
//     },
//     diffRemoved: {
//       dark: "darkRed",
//       light: "lightRed",
//     },
//     diffContext: {
//       dark: "darkFgMuted",
//       light: "lightFgMuted",
//     },
//     diffHunkHeader: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     diffHighlightAdded: {
//       dark: "#3fb950",
//       light: "#1a7f37",
//     },
//     diffHighlightRemoved: {
//       dark: "#f85149",
//       light: "#cf222e",
//     },
//     diffAddedBg: {
//       dark: "#033a16",
//       light: "#dafbe1",
//     },
//     diffRemovedBg: {
//       dark: "#67060c",
//       light: "#ffebe9",
//     },
//     diffContextBg: {
//       dark: "darkBgAlt",
//       light: "lightBgAlt",
//     },
//     diffLineNumber: {
//       dark: "#484f58",
//       light: "#afb8c1",
//     },
//     diffAddedLineNumberBg: {
//       dark: "#033a16",
//       light: "#dafbe1",
//     },
//     diffRemovedLineNumberBg: {
//       dark: "#67060c",
//       light: "#ffebe9",
//     },
//     markdownText: {
//       dark: "darkFg",
//       light: "lightFg",
//     },
//     markdownHeading: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     markdownLink: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     markdownLinkText: {
//       dark: "darkCyan",
//       light: "lightCyan",
//     },
//     markdownCode: {
//       dark: "darkPink",
//       light: "lightPink",
//     },
//     markdownBlockQuote: {
//       dark: "darkFgMuted",
//       light: "lightFgMuted",
//     },
//     markdownEmph: {
//       dark: "darkYellow",
//       light: "lightYellow",
//     },
//     markdownStrong: {
//       dark: "darkOrange",
//       light: "lightOrange",
//     },
//     markdownHorizontalRule: {
//       dark: "#30363d",
//       light: "#d0d7de",
//     },
//     markdownListItem: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     markdownListEnumeration: {
//       dark: "darkCyan",
//       light: "lightCyan",
//     },
//     markdownImage: {
//       dark: "darkBlue",
//       light: "lightBlue",
//     },
//     markdownImageText: {
//       dark: "darkCyan",
//       light: "lightCyan",
//     },
//     markdownCodeBlock: {
//       dark: "darkFg",
//       light: "lightFg",
//     },
//     syntaxComment: {
//       dark: "darkFgMuted",
//       light: "lightFgMuted",
//     },
//     syntaxKeyword: {
//       dark: "darkPink",
//       light: "lightRed",
//     },
//     syntaxFunction: {
//       dark: "darkPurple",
//       light: "lightPurple",
//     },
//     syntaxVariable: {
//       dark: "darkOrange",
//       light: "lightOrange",
//     },
//     syntaxString: {
//       dark: "darkCyan",
//       light: "lightBlue",
//     },
//     syntaxNumber: {
//       dark: "darkBlue",
//       light: "lightCyan",
//     },
//     syntaxType: {
//       dark: "darkOrange",
//       light: "lightOrange",
//     },
//     syntaxOperator: {
//       dark: "darkPink",
//       light: "lightRed",
//     },
//     syntaxPunctuation: {
//       dark: "darkFg",
//       light: "lightFg",
//     },
//   },
// };

export function resolveTheme(
  themeConfig: ThemeConfig,
  mode: ColorMode
): ResolvedTheme {
  const { defs, theme: colors } = themeConfig;

  return {
    defs,
    colors: {
      primary: resolveColor(colors.primary, mode, defs),
      secondary: resolveColor(colors.secondary, mode, defs),
      accent: resolveColor(colors.accent, mode, defs),
      error: resolveColor(colors.error, mode, defs),
      warning: resolveColor(colors.warning, mode, defs),
      success: resolveColor(colors.success, mode, defs),
      info: resolveColor(colors.info, mode, defs),
      text: resolveColor(colors.text, mode, defs),
      textMuted: resolveColor(colors.textMuted, mode, defs),
      background: resolveColor(colors.background, mode, defs),
      backgroundPanel: resolveColor(colors.backgroundPanel, mode, defs),
      backgroundElement: resolveColor(colors.backgroundElement, mode, defs),
      border: resolveColor(colors.border, mode, defs),
      borderActive: resolveColor(colors.borderActive, mode, defs),
      borderSubtle: resolveColor(colors.borderSubtle, mode, defs),
      diffAdded: resolveColor(colors.diffAdded, mode, defs),
      diffRemoved: resolveColor(colors.diffRemoved, mode, defs),
      diffContext: resolveColor(colors.diffContext, mode, defs),
      diffHunkHeader: resolveColor(colors.diffHunkHeader, mode, defs),
      diffHighlightAdded: resolveColor(colors.diffHighlightAdded, mode, defs),
      diffHighlightRemoved: resolveColor(
        colors.diffHighlightRemoved,
        mode,
        defs
      ),
      diffAddedBg: resolveColor(colors.diffAddedBg, mode, defs),
      diffRemovedBg: resolveColor(colors.diffRemovedBg, mode, defs),
      diffContextBg: resolveColor(colors.diffContextBg, mode, defs),
      diffLineNumber: resolveColor(colors.diffLineNumber, mode, defs),
      diffAddedLineNumberBg: resolveColor(
        colors.diffAddedLineNumberBg,
        mode,
        defs
      ),
      diffRemovedLineNumberBg: resolveColor(
        colors.diffRemovedLineNumberBg,
        mode,
        defs
      ),
      markdownText: resolveColor(colors.markdownText, mode, defs),
      markdownHeading: resolveColor(colors.markdownHeading, mode, defs),
      markdownLink: resolveColor(colors.markdownLink, mode, defs),
      markdownLinkText: resolveColor(colors.markdownLinkText, mode, defs),
      markdownCode: resolveColor(colors.markdownCode, mode, defs),
      markdownBlockQuote: resolveColor(colors.markdownBlockQuote, mode, defs),
      markdownEmph: resolveColor(colors.markdownEmph, mode, defs),
      markdownStrong: resolveColor(colors.markdownStrong, mode, defs),
      markdownHorizontalRule: resolveColor(
        colors.markdownHorizontalRule,
        mode,
        defs
      ),
      markdownListItem: resolveColor(colors.markdownListItem, mode, defs),
      markdownListEnumeration: resolveColor(
        colors.markdownListEnumeration,
        mode,
        defs
      ),
      markdownImage: resolveColor(colors.markdownImage, mode, defs),
      markdownImageText: resolveColor(colors.markdownImageText, mode, defs),
      markdownCodeBlock: resolveColor(colors.markdownCodeBlock, mode, defs),
      syntaxComment: resolveColor(colors.syntaxComment, mode, defs),
      syntaxKeyword: resolveColor(colors.syntaxKeyword, mode, defs),
      syntaxFunction: resolveColor(colors.syntaxFunction, mode, defs),
      syntaxVariable: resolveColor(colors.syntaxVariable, mode, defs),
      syntaxString: resolveColor(colors.syntaxString, mode, defs),
      syntaxNumber: resolveColor(colors.syntaxNumber, mode, defs),
      syntaxType: resolveColor(colors.syntaxType, mode, defs),
      syntaxOperator: resolveColor(colors.syntaxOperator, mode, defs),
      syntaxPunctuation: resolveColor(colors.syntaxPunctuation, mode, defs),
    },
    mode,
  };
}

function resolveColor(
  colors: { dark: string; light: string } | string,
  mode: ColorMode,
  defs: Record<string, string>
): string {
  let color: string;

  if (typeof colors === "string") {
    color = colors;
  } else {
    color = colors[mode];
  }

  if (Object.keys(defs).includes(color)) {
    return defs[color] as string;
  } else {
    return color;
  }
}

export function getColor(
  theme: ResolvedTheme,
  colorKey: keyof ResolvedTheme["colors"]
): string {
  const color = theme.colors[colorKey];
  if (typeof color === "string") {
    return color;
  }
  return theme.defs[color] as string;
}

type ThemeName =
  | "github"
  | "ayu"
  | "catppuccin"
  | "dracula"
  | "monokai"
  | "nord";

export const themeNames: ThemeName[] = [
  "github",
  "ayu",
  "catppuccin",
  "dracula",
  "monokai",
  "nord",
] as const;

export type { ThemeConfig, ThemeColors, ResolvedTheme, ColorMode, ThemeName };
