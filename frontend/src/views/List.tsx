import { Link, Spinner } from "@sk-web-gui/react";
import { usePratomatList } from "../services/pratomat-service";
import { relativePath } from "../utils/relative-path";
import { useAppStore } from "../hooks/appStore";
import { backgroundClassMap } from "../utils/backgroundClassMap";

export const List: React.FC = () => {
  const { loaded, data } = usePratomatList();

  const backgroundColor = useAppStore((state) => state.backgroundColor);

  const bgClass =
    backgroundClassMap[backgroundColor] ?? "bg-bjornstigen-surface-primary";

  return !loaded ? (
    <Spinner />
  ) : (
    <main
      className={`w-dvw h-dvh portrait:max-h-dvh ${bgClass} text-light-primary`}
    >
      <ul className="w-fit mx-auto my-32">
        {data.map((pratomat) => (
          <li key={pratomat.app}>
            <Link
              className="text-light-primary hover:text-light-secondary"
              href={relativePath(`/${pratomat.app}`)}
            >
              <strong>{pratomat.name} </strong>- {pratomat.app} -{" "}
              {pratomat.question}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
