import React from 'react';

import { Provider } from 'react-redux';
import UserBox from './src/features/user/UserBox';

import { store } from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <UserBox />
    </Provider>
  )
}

export default App;
