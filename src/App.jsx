import { useState } from 'react'
import reactLogo from './assets/react.svg'



import CreateICO from './components/createico'

import './App.css'

function App() {


  return (
    <>
      <div className="container">

        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9">
            <CreateICO />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
