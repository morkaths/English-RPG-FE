
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import config from "../config/theme.config";

type AppConfig = typeof config;

interface AppConfigContextType {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

// Context
const AppConfigContext = createContext<AppConfigContextType>({
  config: config,
  setConfig: () => {},
});



// Provider
export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [appConfig, setAppConfig] = useState<AppConfig>(config);

  // Apply theme and mode to <html> when config changes
  useEffect(() => {
    document.documentElement.setAttribute("data-color-theme", appConfig.activeTheme);
    document.documentElement.classList.toggle("dark", appConfig.activeMode === "dark");
  }, [appConfig.activeTheme, appConfig.activeMode]);

  return (
    <AppConfigContext.Provider value={{ config: appConfig, setConfig: setAppConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);