export type ColorDefs = Record<string, string>;

export type ColorRef = { dark: string; light: string };

export type ThemeColorValue = ColorRef | string;

export interface ThemeColors {
  primary: ThemeColorValue;
  secondary: ThemeColorValue;
  accent: ThemeColorValue;
  error: ThemeColorValue;
  warning: ThemeColorValue;
  success: ThemeColorValue;
  info: ThemeColorValue;
  text: ThemeColorValue;
  textMuted: ThemeColorValue;
  background: ThemeColorValue;
  backgroundPanel: ThemeColorValue;
  backgroundElement: ThemeColorValue;
  border: ThemeColorValue;
  borderActive: ThemeColorValue;
  borderSubtle: ThemeColorValue;
  diffAdded: ThemeColorValue;
  diffRemoved: ThemeColorValue;
  diffContext: ThemeColorValue;
  diffHunkHeader: ThemeColorValue;
  diffHighlightAdded: ThemeColorValue;
  diffHighlightRemoved: ThemeColorValue;
  diffAddedBg: ThemeColorValue;
  diffRemovedBg: ThemeColorValue;
  diffContextBg: ThemeColorValue;
  diffLineNumber: ThemeColorValue;
  diffAddedLineNumberBg: ThemeColorValue;
  diffRemovedLineNumberBg: ThemeColorValue;
  markdownText: ThemeColorValue;
  markdownHeading: ThemeColorValue;
  markdownLink: ThemeColorValue;
  markdownLinkText: ThemeColorValue;
  markdownCode: ThemeColorValue;
  markdownBlockQuote: ThemeColorValue;
  markdownEmph: ThemeColorValue;
  markdownStrong: ThemeColorValue;
  markdownHorizontalRule: ThemeColorValue;
  markdownListItem: ThemeColorValue;
  markdownListEnumeration: ThemeColorValue;
  markdownImage: ThemeColorValue;
  markdownImageText: ThemeColorValue;
  markdownCodeBlock: ThemeColorValue;
  syntaxComment: ThemeColorValue;
  syntaxKeyword: ThemeColorValue;
  syntaxFunction: ThemeColorValue;
  syntaxVariable: ThemeColorValue;
  syntaxString: ThemeColorValue;
  syntaxNumber: ThemeColorValue;
  syntaxType: ThemeColorValue;
  syntaxOperator: ThemeColorValue;
  syntaxPunctuation: ThemeColorValue;
}

export type ColorMode = "dark" | "light";

export interface ResolvedTheme {
  defs: ColorDefs;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
    info: string;
    text: string;
    textMuted: string;
    background: string;
    backgroundPanel: string;
    backgroundElement: string;
    border: string;
    borderActive: string;
    borderSubtle: string;
    diffAdded: string;
    diffRemoved: string;
    diffContext: string;
    diffHunkHeader: string;
    diffHighlightAdded: string;
    diffHighlightRemoved: string;
    diffAddedBg: string;
    diffRemovedBg: string;
    diffContextBg: string;
    diffLineNumber: string;
    diffAddedLineNumberBg: string;
    diffRemovedLineNumberBg: string;
    markdownText: string;
    markdownHeading: string;
    markdownLink: string;
    markdownLinkText: string;
    markdownCode: string;
    markdownBlockQuote: string;
    markdownEmph: string;
    markdownStrong: string;
    markdownHorizontalRule: string;
    markdownListItem: string;
    markdownListEnumeration: string;
    markdownImage: string;
    markdownImageText: string;
    markdownCodeBlock: string;
    syntaxComment: string;
    syntaxKeyword: string;
    syntaxFunction: string;
    syntaxVariable: string;
    syntaxString: string;
    syntaxNumber: string;
    syntaxType: string;
    syntaxOperator: string;
    syntaxPunctuation: string;
  };
  mode: ColorMode;
}

export interface ThemeConfig {
  defs: ColorDefs;
  theme: ThemeColors;
}
