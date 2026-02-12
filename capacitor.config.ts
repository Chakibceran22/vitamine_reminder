import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Chakibceran22.app',
  appName: 'vitamine_reminder',
  webDir: 'dist',
  server:{
    url: "http://192.168.1.35:4000",
    cleartext:true
  }
};

export default config;
