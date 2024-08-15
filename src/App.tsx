import { ColorSchemeMode, GuiProvider, extendTheme } from "@sk-web-gui/react";
import "./App.css";
import { Main } from "./views/Main";
import { useAssistantStore, setAssistantStoreName } from "@sk-web-gui/ai";
import { Suspense, useEffect } from "react";

function App() {
  const { setSettings } = useAssistantStore();

  useEffect(() => {
    const assistantId = import.meta.env.VITE_DEFAULT_ASSISTANT_ID;
    const user = "";
    const hash = import.meta.env.VITE_HASH;
    setSettings({
      user,
      hash,
      assistantId,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      stream: import.meta.env.VITE_STREAM_DEFAULT,
      app: import.meta.env.VITE_APPLICATION,
    });
    setAssistantStoreName(`sk-assistant-${import.meta.env.VITE_APPLICATION}`);
  }, [setSettings]);

  const theme = extendTheme({
    colorSchemes: {
      light: {
        colors: {
          light: {
            secondary: "#D7DBF2",
          },
        },
      },
    },
  });
  return (
    <GuiProvider theme={theme} colorScheme={ColorSchemeMode.Light}>
      <Suspense fallback="loading">
        <Main />
      </Suspense>
    </GuiProvider>
  );
}

export default App;
