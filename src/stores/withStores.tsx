/* eslint-disable react/display-name */
import * as React from 'react';

import { StoreContext } from '../components/App';

function withStores<P>(WrappedComponent: any, ...args: any) {
  return class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }
    _getDataFromStore = (value: any) => {
      const data: any = {};
      if (value) {
        args.forEach((arg: string) => (data[arg] = value[arg]));
      }
      return data;
    };
    render() {
      return (
        <StoreContext.Consumer>
          {(value) => (
            <WrappedComponent
              {...this._getDataFromStore(value)}
              {...this.props}
            />
          )}
        </StoreContext.Consumer>
      );
    }
  };
}

export default withStores;
