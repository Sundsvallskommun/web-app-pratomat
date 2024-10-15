import { ColorSchemeMode, GuiProvider, extendTheme } from "@sk-web-gui/react";
import "./App.css";
import { Main } from "./views/Main";
import { useAssistantStore, setAssistantStoreName } from "@sk-web-gui/ai";
import { Suspense, useEffect } from "react";
import { usePratomat } from "./services/pratomat-service";
import { List } from "./views/List";

function App() {
  const id = window.location.pathname
    .replace(import.meta.env.VITE_BASE_PATH, "")
    .replace("/", "");

  const [setApiBaseUrl, setStream] = useAssistantStore((state) => [
    state.setApiBaseUrl,
    state.setStream,
  ]);
  const { loaded } = usePratomat(id);

  useEffect(() => {
    setApiBaseUrl(import.meta.env.VITE_INTRIC_API_BASE_URL);
    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    setAssistantStoreName(`sk-assistant-${import.meta.env.VITE_APPLICATION}`);
  }, [setStream, setApiBaseUrl]);

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
      <Suspense fallback="loading">{loaded ? <Main /> : <List />}</Suspense>
    </GuiProvider>
  );
}

export default App;
