
import { RouterProvider } from "react-router";
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { AppConfigProvider } from './context/AppConfigContext';
import customTheme from './utils/theme/custom-theme';
import router from "./routes";


function App() {

  return (
    <>
      <ThemeModeScript />
      <AppConfigProvider>
        <Flowbite theme={{ theme: customTheme }}>
          <RouterProvider router={router} />
        </Flowbite>
      </AppConfigProvider>
    </>
  );
}

export default App;
