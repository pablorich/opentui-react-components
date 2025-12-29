import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Demo } from "./pages/demo";
import { ThemeProvider } from "./theme/provider";

const renderer = await createCliRenderer();

function App() {
  return (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  );
}
createRoot(renderer).render(<App />);
