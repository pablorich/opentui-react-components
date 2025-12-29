import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { OpenClone } from "./pages/openclone";

function App() {
  return <OpenClone />;
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
