import { useEffect } from "react";
import { useAppStore } from "./appStore";
import { usePratomat } from "../services/pratomat-service";

interface UseBackgroundColorProps {
  appId: string;
}

export const useBackgroundColor = ({ appId }: UseBackgroundColorProps) => {
  const setBackgroundColor = useAppStore((state) => state.setBackgroundColor);
  const { pratomat } = usePratomat(appId);

  useEffect(() => {
    if (pratomat?.backgroundColor) {
      setBackgroundColor(pratomat.backgroundColor);
    }
  }, [pratomat]);
};
