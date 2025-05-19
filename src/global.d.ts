export {};

declare global {
  interface Window {
    IS_MICROFRONTEND?: boolean;
  }
}
