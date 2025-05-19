declare module '@jest/globals' {
  export const describe: (name: string, fn: () => void) => void;
  export const test: (name: string, fn: () => void) => void;
  export const expect: any;
  export const beforeEach: (fn: () => void) => void;
}
