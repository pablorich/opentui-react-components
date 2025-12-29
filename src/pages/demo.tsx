import { useState } from "react";
import { useKeyboard } from "@opentui/react";
import {
  Container,
  FlexRow,
  FlexCol,
  HalfSpacer,
  Spacer,
  useTheme,
  Text,
} from "./../components";
import { ThemeSelectorModal } from "./../ThemeSelectorModal";

export function Demo() {
  const { theme, setMode, mode } = useTheme();
  const [showPanel, setShowPanel] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  useKeyboard((key) => {
    if (key.ctrl && key.name === "t") {
      setMode(mode === "dark" ? "light" : "dark");
    }
    if (key.ctrl && key.name === "p") {
      setShowThemeModal(!showThemeModal);
    }
  });

  return (
    <Container variant="default" padding={1} scrollable>
      <FlexCol>
        <FlexRow>
          <Text color="accent">◀</Text>
          <Spacer size={1} />
          <Text>Theme Demo </Text>
          <Spacer size={1} />
          <Text color="primary">Press Ctrl+T to toggle </Text>
          <Spacer size={1} />
          <Text color="secondary">Ctrl+P for themes</Text>
          <Spacer size={1} />
          <Text color="accent">▶</Text>
        </FlexRow>

        <HalfSpacer colorKey="borderSubtle" />

        <FlexRow style={{ gap: 5 }}>
          <FlexCol>
            <Container variant="panel" padding={1}>
              <FlexCol>
                <Text color="primary">Semantics</Text>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Primary: </Text>
                  <Text color="primary">lorem ipsum●</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Secondary: </Text>
                  <Text color="secondary">dolor sit amet ●</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Success: </Text>
                  <Text color="success">Success ✓</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Error: </Text>
                  <Text color="error">Error ✗</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Warning: </Text>
                  <Text color="warning">Warning!⚠</Text>
                </FlexRow>
              </FlexCol>
            </Container>

            <Spacer size={1} />

            <Container variant="panel" padding={1}>
              <FlexCol>
                <Text color="primary">Spacers</Text>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Light (░): </Text>
                  <HalfSpacer variant="light" colorKey="borderSubtle" />
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Upper Half (▀): </Text>
                  <HalfSpacer variant="upperHalf" colorKey="borderSubtle" />
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Medium (▒): </Text>
                  <HalfSpacer variant="medium" colorKey="borderSubtle" />
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>Heavy (▓): </Text>
                  <HalfSpacer variant="heavy" colorKey="borderSubtle" />
                </FlexRow>
              </FlexCol>
            </Container>

            <Spacer size={1} />

            <Container variant="panel" padding={1}>
              <FlexCol>
                <Text color="primary">Typography</Text>
                <Spacer size={1} />
                <Text>Normal text color</Text>
                <Spacer size={1} />
                <Text color="textMuted">Muted text color</Text>
                <Spacer size={1} />
                <Text color="accent">Accent color for emphasis</Text>
                <Spacer size={1} />
                <Text color="info">Info color for hints</Text>
              </FlexCol>
            </Container>
          </FlexCol>
          <Container variant="panel" padding={2} style={{ minWidth: 50 }}>
            <Text color="warning">press ctr+p</Text>
            <Spacer />
            {showPanel && (
              <FlexCol>
                <Text color="primary">Panel Component</Text>
                <Spacer size={1} />
                <Text color="textMuted">
                  This is a themed panel component with
                </Text>
                <Spacer size={1} />
                <Text>{mode === "dark" ? "dark" : "light"} mode</Text>
                <Spacer size={1} />
                <Text color="textMuted">styling applied automatically.</Text>
              </FlexCol>
            )}
          </Container>
        </FlexRow>

        <HalfSpacer colorKey="borderSubtle" />

        <FlexRow>
          <Text color="textMuted">Current mode:</Text>
          <Spacer size={1} />
          <Text color="primary">{mode.toUpperCase()}</Text>
        </FlexRow>
      </FlexCol>

      {showThemeModal && (
        <ThemeSelectorModal
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
        />
      )}
    </Container>
  );
}
