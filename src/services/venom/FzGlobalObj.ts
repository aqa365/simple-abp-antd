export interface FzGlobalObj {
  get: () => string;
  update: (json: string) => void;
  updateAim: (json: string) => void;
}
