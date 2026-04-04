import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aiprojects.aacalculator',
  appName: 'AA计算器',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      releaseType: 'APK'
    }
  }
};

export default config;
