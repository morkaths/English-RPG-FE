
import { Icon } from "@iconify/react";
import { useAppConfig } from "src/context/AppConfigContext";

const ToggleThemeButton = () => {
  const { config, setMode } = useAppConfig();

  const toggleMode = () => {
    setMode(config.activeMode === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleMode}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
      title="Chuyển giao diện sáng/tối"
      type="button"
    >
      <Icon icon={config.activeMode === "dark" ? "solar:moon-linear" : "solar:sun-linear"} width={22} />
    </button>
  );
};

export default ToggleThemeButton;