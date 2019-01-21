

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import beaconContainer from './beaconContainer'
import rootReducer from './redux/reducers'

const store = createStore(rootReducer);

class app extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <beaconContainer />
      </Provider>
    )
  }
}

export default app;