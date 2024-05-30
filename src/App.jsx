import AppRouter from "./routers/AppRouter"
import { Provider } from 'react-redux'
import store from './store/store'
import FontLoader from './components/FontLoader';
import '@fortawesome/fontawesome-free/css/all.css';

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
