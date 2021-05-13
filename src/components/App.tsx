import React from 'react';
import { LogBox, StatusBar, Text, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Box, ThemeProvider } from 'react-native-kondo';

import images from '../constants/images';
import { fontsMap } from '../constants/fonts';
import { RootStore } from '../stores';
import colors from '../constants/colors';

export const StoreContext = React.createContext<any>(undefined);

export function useStores() {
  return React.useContext(StoreContext);
}

export const rootStore = new RootStore();

const App = () => {
  StatusBar.setBarStyle('light-content');
  const [ready, setReady] = React.useState(false);

  const initApp = React.useCallback(async () => {
    await Promise.all([loadResources()]);
    setReady(true);
  }, []);

  React.useEffect(() => {
    // TODO remove warning.
    LogBox.ignoreLogs(['Require cycle:', 'Warning', '[MobX]']);
    initApp();
  }, [initApp]);

  const loadResources = async () => {
    const { icons, ...rest } = images;
    await Promise.all([
      // @ts-ignore
      Asset.loadAsync(Object.values(icons)),
      Asset.loadAsync(Object.values(rest)),
      Font.loadAsync({
        ...fontsMap,
      }),
    ]);
  };

  return ready ? (
    <StoreContext.Provider value={rootStore}>
      <AppContent />
    </StoreContext.Provider>
  ) : (
    <AppLoading />
  );
};

const AppContent = () => {
  const [splashScreen, setSplashScreen] = React.useState<any>(undefined);
  React.useEffect(() => {
    // TMP fetching simulation
    setTimeout(() => {
      setSplashScreen(true);
    }, 2500);
  }, [splashScreen]);

  const makeApiCall = async () => {
    // As soon as fetch is called, it crashes.
    const res = await fetch('https://www.google.com/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        flex={1}
        bg={colors.green}
        justifyContent="center"
        alignItems="center"
      >
        <TouchableOpacity onPress={makeApiCall}>
          <Box width={150} height={30} bg={colors.orange}>
            <Text>Make API Call</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </ThemeProvider>
  );
};

const theme = {
  borders: [],
  colors: {},
  fonts: {},
  fontSizes: [],
  letterSpacings: [],
  lineHeights: [],
  shadows: [],
  space: [],
};

export default App;
