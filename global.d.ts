// // global.d.ts
export {};

declare global {
  interface Window {
    Tawk_API?: {
      shutdown?: () => void;
      onLoad?: () => void;
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
