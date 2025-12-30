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
import {
  ThemeProvider,
  Container,
  HalfSpacer,
  githubTheme,
} from "./components";

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
    <box
      style={{
        backgroundColor: theme.defs[theme.colors.background],
      }}
    >
      <text style={{ fg: getColor("text") }}>Themed text</text>
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

## Loading Components

### `CircularLoader`

A spinning braille-pattern loader using the classic spinner sequence.

```tsx
<CircularLoader speed={100} />
```

**Props:**

- `speed` (optional): Animation speed in milliseconds between frames (default: 100)

**Colors used:** `primary`

**Example:**

```tsx
<Container variant="panel" padding={1}>
  <FlexCol>
    <Text color="primary">Loading...</Text>
    <Spacer size={1} />
    <CircularLoader />
  </FlexCol>
</Container>
```

### `ColorDimmedWaveLoader`

A wave animation with an 8-character sliding trail. As it moves, the trail shows a gradient of dimming: brightest big square (■) at the leading edge, followed by progressively dimmed squares. After the first 4 positions (big squares), the trail continues with small squares (▪) that maintain the same dimming pattern but are always at the lowest brightness level.

```tsx
<ColorDimmedWaveLoader width={20} speed={150} />
```

**Trail pattern:**

- Position 0 (leading edge): Big square (■) at 100% brightness (head)
- Position 1: Big square (■) at 75% brightness
- Position 2: Big square (■) at 50% brightness
- Position 3: Big square (■) at 25% brightness
- Position 4-7: Small squares (▪) at 25% brightness

**Animation phases:**

1. **Enter**: All dimmed small squares at 25% brightness
2. **Move**: Slides left-to-right, then right-to-left
3. **Exit**: Disappears from one edge
4. **Enter from opposite side**: Reappears and continues in opposite direction

**Props:**

- `width` (optional): Total animation width in characters (minimum 8, default: 20)
- `speed` (optional): Animation speed in milliseconds per position move (default: 150)

**Colors used:**

- Head and trail: `primary` blended with `background` at varying opacities (100%, 75%, 50%, 25%)
- Empty space: `primary` at 25% opacity

**Example:**

```tsx
<Container variant="panel" padding={1}>
  <FlexCol>
    <Text color="primary">Processing...</Text>
    <Spacer size={1} />
    <ColorDimmedWaveLoader width={25} />
  </FlexCol>
</Container>
```

**Trail pattern:**

- 4 big squares (■) with brightness: 100%, 75%, 50%, 25%
- 4 small squares (▪) with brightness: 100%, 75%, 50%, 25%

**Animation phases:**

1. **Enter**: All small squares at 10% brightness
2. **Move**: Trail appears and moves across
3. **Exit**: Trail disappears when reaching the edge
4. **Reverse**: Trail reappears from opposite side

**Props:**

- `width` (optional): Total animation width in characters (minimum 8, default: 20)
- `speed` (optional): Animation speed in milliseconds per position move (default: 150)

**Colors used:**

- Trail: `primary` blended with `background` at varying opacities
- Empty space: `primary` at 10% opacity

**Example:**

```tsx
<Container variant="panel" padding={1}>
  <FlexCol>
    <Text color="primary">Processing...</Text>
    <Spacer size={1} />
    <ColorDimmedWaveLoader width={25} />
  </FlexCol>
</Container>
```

### `CharDimmedWaveLoader`

A wave animation using block shading characters (█▓▒░) with the same color, dimming through character density.

```tsx
<CharDimmedWaveLoader width={20} speed={150} trailLength={3} color="primary" />
```

**Props:**

- `width` (optional): Total animation width in characters (minimum 7, default: 20)
- `speed` (optional): Animation speed in milliseconds per position move (default: 150)
- `trailLength` (optional): Number of trailing squares (default: 3)
- `color` (optional): Theme color for the blocks (default: "primary", options: "primary" | "accent" | "secondary")

**Colors used:**

- All blocks: Configured color prop (default: `primary`)
- Empty space: `textMuted`

**Example:**

```tsx
<Container variant="panel" padding={1}>
  <FlexCol>
    <Text color="accent">Syncing...</Text>
    <Spacer size={1} />
    <CharDimmedWaveLoader width={25} color="accent" />
  </FlexCol>
</Container>
```

**Note:** All wave loaders use a ping-pong animation pattern (left → right → left).
