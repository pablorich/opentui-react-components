import { useKeyboard } from "@opentui/react";
import { useState } from "react";
import {
  Container,
  FlexCol,
  FlexRow,
  HalfSpacer,
  LayeredRasterDonut,
  ParametricRaycastDonut,
  Spacer,
  Text,
  useTheme,
} from "./../components";
import { SpinningPyramid } from "../components/graphics/spinningPyramid";
import { ThemeSelectorDialog } from "./../ThemeSelectorDialog";

export function Demo() {
  const { setMode, mode } = useTheme();
  const [_showPanel, _setShowPanel] = useState(false);
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
          <Spacer />
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
                  <Text color="primary">lorem ipsum ● </Text>
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
                  <Text color="warning">Warning!</Text>
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
          <FlexCol>
            <FlexRow style={{ gap: 1, flexWrap: "wrap" }}>
              <Container variant="panel" padding={1}>
                <Text color="primary">Parametric Raycasting</Text>
                <Spacer size={1} />
                <ParametricRaycastDonut width={60} height={30} speed={1} />
              </Container>

              <Spacer size={1} />

              <Container variant="default" padding={1}>
                <Text color="primary">Layered Rasterization</Text>
                <Spacer size={1} />
                <LayeredRasterDonut width={60} height={30} speed={1} />
              </Container>
              <Container variant="panel" padding={1}>
                <Text color="primary"></Text>
                <Spacer size={1} />
                <SpinningPyramid wireframe={false} />
              </Container>
            </FlexRow>
          </FlexCol>
        </FlexRow>

        <HalfSpacer colorKey="borderSubtle" />

        <FlexRow>
          <Text color="textMuted">Current mode:</Text>
          <Spacer size={1} />
          <Text color="primary">{mode.toUpperCase()}</Text>
        </FlexRow>
      </FlexCol>

      {showThemeModal && (
        <ThemeSelectorDialog
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
        />
      )}
    </Container>
  );
}
