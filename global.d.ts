// // global.d.ts
export {};

declare global {
  interface Window {
    Tawk_API?: {
      //   hideWidget: () => void;
      //   endChat: () => void;
      shutdown: () => void;
    };
  }
}

// global.d.ts
// interface Window {
//   Intercom: (command: string, options?: any) => void;
// }
