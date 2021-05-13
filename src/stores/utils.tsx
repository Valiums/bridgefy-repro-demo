import withStores from './withStores';

export function inject(...args: any) {
  return function decorator(Component: any): any {
    return withStores<any>(Component, ...args);
  };
}
