# Doc how to start capcitor:

```bash
npm install @capacitor/core @capacitor/cli

npx cap init

# to get android for my case

npm install @capacitor/android
npx cap add android
```

To run the project with live updates:

```bash
npm run android 
```
 with no live updates and hot reload , update this file **capacitor.config.ts :
 ```typescript
 import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Chakibceran22.app',
  appName: 'vitamine_reminder',
  webDir: 'dist',
  server:{// <-- take off this server section
    url: "http://192.168.1.35:4000",
    cleartext:true
  }
};

export default config;
```
 