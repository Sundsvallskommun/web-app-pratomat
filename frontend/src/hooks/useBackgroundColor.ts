import { useEffect } from "react";
import { useAppStore } from "./appStore";

interface UseBackgroundColorProps {
  appId: string;
}

export const useBackgroundColor = ({ appId }: UseBackgroundColorProps) => {
  const setBackgroundColor = useAppStore((state) => state.setBackgroundColor);

  useEffect(() => {
    const fetchAssistant = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/assistants/public/${appId}`
        );
        // Jag får det inte att fungera utan att lägga till localhost:3001 i url:en.. är det något med CORS?
        const json = await response.json();
        const backgroundColor = json.data.backgroundColor;
        setBackgroundColor(backgroundColor);
      } catch (err: any) {
        console.error("Failed to fetch background color", err);
      }
    };

    fetchAssistant();
  }, [appId]);
};
