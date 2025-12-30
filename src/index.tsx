import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { ToastProvider } from "./components/feedback";
import { Demo } from "./pages/demo";
import { ThemeProvider } from "./theme/provider";

const renderer = await createCliRenderer();

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Demo />
      </ToastProvider>
    </ThemeProvider>
  );
}
createRoot(renderer).render(<App />);
