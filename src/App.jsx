import React from 'react';
import AppRouter from './routers/AppRouter';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../src/store/store'


function App() {
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
