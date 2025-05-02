import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="todo-app-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
