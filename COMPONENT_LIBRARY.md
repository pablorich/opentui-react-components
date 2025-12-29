# TUI Component Library

A themable component library for OpenTUI with abstracted styling.

## Features

- **Theme System**: Comprehensive theme support with dark/light modes
- **Semantic Colors**: Color categories (primary, secondary, accent, etc.)
- **Auto-styled Components**: No manual style props needed
- **Theme Context**: React Context for theme management
- **Extensible**: Easy to add custom themes

## Usage

```tsx
import { ThemeProvider, Container, HalfSpacer, githubTheme } from "./components";

function App() {
  const theme = resolveTheme(githubTheme, "dark");

  return (
    <ThemeProvider themeConfig={githubTheme} defaultMode="dark">
      <Container variant="panel" padding={1}>
        <text>Hello from themed component!</text>
        <HalfSpacer variant="upperHalf" color="borderSubtle" />
      </Container>
    </ThemeProvider>
  );
}
```

## Components

### Layout

#### `Container`
Wrapper component with themed background colors.

```tsx
<Container variant="default" padding={1}>
  {children}
</Container>

<Container variant="panel" padding={2}>
  {children}
</Container>

<Container variant="transparent">
  {children}
</Container>
```

#### `FlexRow` / `FlexCol`
Flexbox layout containers with themed backgrounds.

```tsx
<FlexRow padding={1}>
  <text>Left</text>
  <Spacer size={2} />
  <text>Right</text>
</FlexRow>

<FlexCol padding={1}>
  <text>Top</text>
  <Spacer size={1} />
  <text>Bottom</text>
</FlexCol>
```

#### `HalfSpacer`
Unicode block character spacer for fractional spacing.

```tsx
<HalfSpacer variant="light" color="borderSubtle" />
<HalfSpacer variant="upperHalf" color="border" />
<HalfSpacer variant="heavy" color="borderSubtle" />
```

Available variants:
- `light` - ░
- `medium` - ▒
- `heavy` - ▓
- `upperHalf` - ▀
- `lowerHalf` - ▄
- `leftHalf` - ▌
- `rightHalf` - ▐

#### `Spacer`
Simple empty spacer box.

```tsx
<Spacer size={1} />
<Spacer size={2} />
```

## Theme API

### Using Theme

```tsx
import { useTheme } from "./components";

function MyComponent() {
  const { theme, getColor } = useTheme();

  return (
    <box style={{
      backgroundColor: theme.defs[theme.colors.background],
    }}>
      <text style={{ fg: getColor("text") }}>
        Themed text
      </text>
    </box>
  );
}
```

### Switching Modes

```tsx
function App() {
  const { mode, setMode } = useTheme();

  return (
    <box>
      <text>Current: {mode}</text>
      <box>
        <text>Dark</text>
        <text onPress={() => setMode("dark")}>[x]</text>
      </box>
      <box>
        <text>Light</text>
        <text onPress={() => setMode("light")}>[ ]</text>
      </box>
    </box>
  );
}
```

### Available Colors

The theme provides these semantic color categories:

- `primary` - Main accent color
- `secondary` - Secondary accent
- `accent` - Emphasis accent
- `error` - Error states
- `warning` - Warning states
- `success` - Success states
- `info` - Informational
- `text` - Primary text color
- `textMuted` - Muted text
- `background` - Main background
- `backgroundPanel` - Panel backgrounds
- `backgroundElement` - Element backgrounds
- `border` - Borders
- `borderActive` - Active borders
- `borderSubtle` - Subtle borders
- `diff*` - Diff view colors
- `markdown*` - Markdown rendering colors
- `syntax*` - Syntax highlighting colors

## Creating Custom Themes

```tsx
import type { ThemeConfig, ColorDefs } from "./components";

const myTheme: ThemeConfig = {
  defs: {
    darkBg: "#1a1a1a",
    darkFg: "#e0e0e0",
    // ... more colors
  },
  theme: {
    primary: {
      dark: "darkFg",
      light: "darkBg",
    },
    // ... more theme mappings
  },
};
```

## Component Library Best Practices

1. **Use semantic colors** - Reference theme colors, not hardcoded values
2. **Keep components unopinionated** - Allow style overrides
3. **Document color usage** - Specify which theme colors each component uses
4. **Export types** - Make props type-safe
5. **Consistent API** - Follow similar prop patterns across components
