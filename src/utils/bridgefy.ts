import RNBridgefy, { BridgefyClient } from 'react-native-bridgefy';
import { NativeEventEmitter } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// @ts-ignore
const bridgefyEmitter = new NativeEventEmitter(RNBridgefy);

let client: BridgefyClient;

function getClient() {
  return client;
}

async function init() {
  const BRIDGEFY_API_KEY = await SecureStore.getItemAsync('bridgefy');
  if (!BRIDGEFY_API_KEY) {
    throw new Error(
      'Missing BRIDGEFY_API_KEY. Make sure to fetch metaData first.',
    );
  }
  client = await RNBridgefy.init('');
  logData(client, 'my data');
}

async function start() {
  const client = getClient();
  if (!client) {
    throw new Error('You need to init Bridgefy first');
  }

  const options = {
    autoConnect: false,
    encryption: true,
  };

  RNBridgefy.start(options)
    .then(() => {
      console.log('started cb');
    })
    .catch((e) => {
      console.warn(e);
    });
}

function stop() {
  RNBridgefy.stop;
}

// This method is launched when a device is nearby and has established connection with the local user.
// It receives a device dictionary.
bridgefyEmitter.addListener('onDeviceConnected', (device) => {
  logData('onDeviceConnected', device);
});

bridgefyEmitter.addListener('onDeviceDetected', (device) => {
  logData('onDeviceDetected', device);
});
bridgefyEmitter.addListener('onStopped', () => {
  logData('onStopped');
});

bridgefyEmitter.addListener('onEventOccurred', (event) => {
  logData('Event code: ' + event.code + ' Description: ' + event.description);
});

const logData = (...args: any) => {
  console.log(Constants.deviceName, ...args);
};

bridgefyEmitter.addListener('onMessageReceived', (message) => {
  logData('onMessageReceived', message);
});

bridgefyEmitter.addListener('onBroadcastMessageReceived', (message) => {
  logData('onBroadcastMessageReceived', message);
});

bridgefyEmitter.addListener('onMessageReceivedException', (error) => {
  console.log('onMessageReceivedException: ' + error);
  console.log('sender: ' + error.sender); // User ID of the sender
  console.log('code: ' + error.code); // error code
  console.log('message' + error.message); // message object empty
  console.log('description' + error.description); // Error cause
});

bridgefyEmitter.addListener('onMessageFailed', (error) => {
  console.log('onMessageFailed', error);

  console.log('code: ' + error.code); // error code
  console.log('message' + error.message); // message object
  console.log('description' + error.description); // Error cause
});

// This method is launched when a connection attempt to a device failed. This event is iOS only.
bridgefyEmitter.addListener('onDeviceConnectFailed', (device) => {
  console.log('onDeviceConnectFailed: ' + device);
});
// This method is launched when there is a disconnection of a user.
// bridgefyEmitter.addListener('onDeviceLost', (device) => {});

export default { init, getClient, start, stop };
