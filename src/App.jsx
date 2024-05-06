import { useState } from 'react'
import { APP_FOLDER_NAME } from "./globals";


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>

      <h1 className="text-4xl font-bold underline ">
      Hello world!
      </h1>
    </BrowserRouter>
  )
}

export default App
