
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import config from "../config/app.config";

type AppConfig = typeof config;

interface AppConfigContextType {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  setMode: (mode: "light" | "dark") => void;
  setTheme: (theme: string) => void;
}

// Context
const AppConfigContext = createContext<AppConfigContextType>({
  config: config,
  setConfig: () => { },
  setMode: () => { },
  setTheme: () => { }
});


// Provider
export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [appConfig, setAppConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem("appConfig");
    return saved ? { ...config, ...JSON.parse(saved) } : config;
  });

  // Apply theme and mode to <html> when config changes
  useEffect(() => {
    localStorage.setItem("appConfig", JSON.stringify(appConfig));
    document.documentElement.setAttribute("data-color-theme", appConfig.activeTheme);
    document.documentElement.classList.toggle("dark", appConfig.activeMode === "dark");
  }, [appConfig]);

  // Cài đặt chế độ (light/dark)
  const setMode = useCallback((mode: "light" | "dark") => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      activeMode: mode
    }));
  }, []);

  // Cài đặt giao diện (theme)
  const setTheme = useCallback((theme: string) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      activeTheme: theme
    }));
  }, []);

  const contextValue: AppConfigContextType = {
    config: appConfig,
    setConfig: setAppConfig,
    setMode,
    setTheme
  };

  return (
    <AppConfigContext.Provider value={contextValue}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }
  return context;
};