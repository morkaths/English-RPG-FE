
import { BrowserRouter } from "react-router-dom";
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { AppConfigProvider } from './context/AppConfigContext';
import { AuthProvider } from './context/AuthContext';
import customTheme from './utils/theme/custom-theme';
import AppRoutes from "./routes";


function App() {

  return (
    <>
      <ThemeModeScript />
      <AppConfigProvider>
        <AuthProvider>
          <Flowbite theme={{ theme: customTheme }}>
            <BrowserRouter basename="English-RPG">
              <AppRoutes />
            </BrowserRouter>
          </Flowbite>
        </AuthProvider>
      </AppConfigProvider>
    </>
  );
}

export default App;
