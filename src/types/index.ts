export interface Env {
  name: string;
}

export type KeysOf<T> = Extract<keyof T, string>;

export interface NativeEventScrollView {
  contentInset: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  contentOffset: {
    x: number;
    y: number;
  };
  contentSize: {
    height: number;
    width: number;
  };
  layoutMeasurement: {
    height: number;
    width: number;
  };
  zoomScale: number;
}
