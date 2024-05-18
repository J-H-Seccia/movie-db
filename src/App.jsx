import AppRouter from "./routers/AppRouter"
// import { useState } from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import FontLoader from './components/FontLoader';


function App() {
  const fontsToLoad = ['Open+Sans:400,700'];
  return (
    <>
      <Provider store={store}>
        <FontLoader fonts={fontsToLoad} />
        <AppRouter />
      </Provider>
    </>
  )
}

export default App
