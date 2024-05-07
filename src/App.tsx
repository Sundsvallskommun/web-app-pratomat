import { GuiProvider, extendTheme } from "@sk-web-gui/react";
import "./App.css";
import { Main } from "./views/Main";
import { useAssistantContext } from "@sk-web-gui/ai";
import { Suspense, useEffect } from "react";

function App() {
  // const { setUser, setHash, setAssistantId } = useAppContext();
  const { setSettings } = useAssistantContext();

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
    // setUser(user);
    // setHash(hash);
    // setAssistantId(assistantId);
  }, []);

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
    <GuiProvider theme={theme} colorScheme="light">
      <Suspense fallback="loading">
        <Main />
      </Suspense>
    </GuiProvider>
  );
}

export default App;
