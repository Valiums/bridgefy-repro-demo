import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import devicesWithNotch from '../../node_modules/react-native-device-info/src/internal/devicesWithNotch';

const hasNotch = () => {
  const modelName =
    Device.modelName === 'iPhone' ? 'iPhone 12' : Device.modelName;
  return devicesWithNotch.findIndex((d) => d.model === modelName) !== -1;
};

const shadows = {
  light: {
    shadowColor: 'rgb(100,100,100)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const createHitSlop = (size: number) => ({
  top: size,
  right: size,
  bottom: size,
  left: size,
});
const createCircle = (diameter: number) => ({
  height: diameter,
  width: diameter,
  borderRadius: diameter / 2,
});

const isLargeDevice = windowHeight >= 812;
const isSmallDevice = windowWidth < 375;

const paddingHorizontal = 15;
const paddingHorizontalLarge = 25;

export default {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isLargeDevice,
  isSmallDevice,
  createCircle,
  createHitSlop,
  statusBarHeight: Constants.statusBarHeight,
  windowHeight,
  windowWidth,
  paddingHorizontal,
  paddingHorizontalLarge,
  safeTopDistance: definePaddingTop(),
  safeBottomDistance: definePaddingBottom(),
  hasNotch,
  shadows,
};

function definePaddingTop() {
  if (Platform.OS === 'ios') {
    return isLargeDevice ? 60 : 35;
  } else {
    return isLargeDevice ? 50 : 35;
  }
}

function definePaddingBottom() {
  if (Platform.OS === 'ios') {
    return isLargeDevice ? 24 + 10 : 24;
  } else {
    return 24;
  }
}
