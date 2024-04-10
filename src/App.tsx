import { GuiProvider, extendTheme } from "@sk-web-gui/react";
import "./App.css";
import { Main } from "./views/Main";
import { useAppContext } from "./context/app.context";
import { useEffect } from "react";

function App() {
  const { setUser, setHash, setAssistantId } = useAppContext();

  useEffect(() => {
    const assistantId = import.meta.env.VITE_DEFAULT_ASSISTANT_ID;
    const user = "";
    const hash = import.meta.env.VITE_HASH;
    setUser(user);
    setHash(hash);
    setAssistantId(assistantId);
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
      <Main />
    </GuiProvider>
  );
}

export default App;
