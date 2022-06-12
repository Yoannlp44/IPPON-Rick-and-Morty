import Config from './config';

export default {
  name: Config.appName,
  version: '1.0.0',
  orientation: 'portrait',
  icon: 'src/assets/icon.png',
  ios: {
    bundleIdentifier: 'com.ippon.rickandmorty',
  },
  android: {
    package: 'com.ippon.rickandmorty',
    versionCode: 1
  },
};