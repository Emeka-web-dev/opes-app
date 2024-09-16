// // global.d.ts
export {};

declare global {
  interface Window {
    Tawk_API?: {
      //   hideWidget: () => void;
      //   endChat: () => void;
      shutdown?: () => void;
      onLoad?: () => void;
      autoStart?: any;
      hideWidget?: () => void;
      showWidget?: () => void;
      popup?: () => void;
    };
  }
}

// global.d.ts
// interface Window {
//   Intercom: (command: string, options?: any) => void;
// }
