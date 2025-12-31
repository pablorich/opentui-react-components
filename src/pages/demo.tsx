import { useKeyboard } from "@opentui/react";
import { useRef, useState } from "react";
import {
  CharDimmedWaveLoader,
  ChatInput,
  CircularLoader,
  ColorDimmedWaveLoader,
  Container,
  FlexCol,
  FlexRow,
  HalfSpacer,
  LayeredRasterDonut,
  ParametricRaycastDonut,
  Spacer,
  Text,
  useTheme,
  useToast,
} from "./../components";
import { SpinningPyramid } from "../components/graphics/spinningPyramid";
import { ThemeSelectorDialog } from "./../ThemeSelectorDialog";

export function Demo() {
  const { setMode, mode, theme } = useTheme();
  const [_showPanel, _setShowPanel] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { toast: showToast, success, error, warning, info } = useToast();
  const textRef = useRef(null);

  useKeyboard((key) => {
    if (key.ctrl && key.name === "t") {
      setMode(mode === "dark" ? "light" : "dark");
    }
    if (key.ctrl && key.name === "p") {
      setShowThemeModal(!showThemeModal);
    }
    if (key.name === "1") {
      success("Success message!", {
        position: "bottom-right",
        contentPosition: "center",
        width: 10,
      });
    }
    if (key.name === "2") {
      error("Error message!", {
        position: "bottom-right",
        contentPosition: "center",
        width: 70,
      });
    }
    if (key.name === "3") {
      warning("Warning message!", {
        position: "bottom-right",
        contentPosition: "center",
      });
    }
    if (key.name === "4") {
      info("Info message!", {
        position: "bottom-right",
        contentPosition: "center",
      });
    }
    if (key.name === "q") {
      info("Top-left toast", { position: "top-left" });
    }
    if (key.name === "w") {
      info("Top-right toast", {
        position: "top-right",
        contentPosition: "right",
      });
    }
    if (key.name === "e") {
      info("Bottom-left toast", { position: "bottom-left" });
    }
    if (key.name === "r") {
      info("Bottom-right toast", { position: "bottom-right" });
    }
    if (key.name === "t") {
      showToast("Custom toast", {
        variant: "success",
        title: "Custom Title",
        duration: 5000,
        position: "top-right",
      });
    }
  });

  return (
    <>
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

          <FlexRow style={{ gap: 2 }}>
            <FlexCol props={{ minWidth: 30 }}>
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
            <FlexCol props={{ minWidth: 70 }}>
              <Container variant="panel" padding={1}>
                <Text color="primary">Parametric Raycasting</Text>
                <Spacer size={1} />
                <ParametricRaycastDonut width={60} height={30} speed={1} />
              </Container>

              <Spacer size={1} />

              <Container variant="panel" padding={1}>
                <Text color="primary">Layered Rasterization</Text>
                <Spacer size={1} />
                <LayeredRasterDonut width={60} height={30} speed={1} />
              </Container>
              {/* <Container variant="panel" padding={1}>
                <Text color="primary"></Text>
                <Spacer size={1} />
                <SpinningPyramid wireframe={false} />
              </Container> */}
            </FlexCol>
            <FlexCol>
              <Container variant="panel" padding={1}>
                <Text color="primary">Toast Demo</Text>
                <Spacer size={1} />
                <FlexRow>
                  <Text>1:</Text>
                  <Spacer size={1} />
                  <Text>Success</Text>
                  <Spacer size={1} />
                  <Text>2:</Text>
                  <Spacer size={1} />
                  <Text>Error</Text>
                  <Spacer size={1} />
                  <Text>3:</Text>
                  <Spacer size={1} />
                  <Text>Warning</Text>
                  <Spacer size={1} />
                  <Text>4:</Text>
                  <Spacer size={1} />
                  <Text>Info</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>q,w,e,r:</Text>
                  <Spacer size={1} />
                  <Text>TL,TR,BL,BR</Text>
                </FlexRow>
                <Spacer size={1} />
                <FlexRow>
                  <Text>t:</Text>
                  <Spacer size={1} />
                  <Text>Custom 5s toast</Text>
                </FlexRow>
              </Container>
              <Spacer />
              <Container variant="panel" padding={1}>
                <CircularLoader />
                <ColorDimmedWaveLoader />
                <CharDimmedWaveLoader />
              </Container>
              <Spacer />
              <Container variant="panel" padding={1}>
                <ChatInput textareaRef={textRef}>
                  <Text>
                    <span fg={theme.colors.accent}>Hey </span>
                    Cowboy
                  </Text>
                </ChatInput>
              </Container>
            </FlexCol>
          </FlexRow>

          <HalfSpacer colorKey="borderSubtle" />

          <FlexRow>
            <Text color="textMuted">Current mode:</Text>
            <Spacer size={1} />
            <Text color="primary">{mode.toUpperCase()}</Text>
          </FlexRow>
        </FlexCol>
      </Container>
      {showThemeModal && (
        <ThemeSelectorDialog
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
        />
      )}
    </>
  );
}
