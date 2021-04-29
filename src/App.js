import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import CharacterCreation from './pages/CharacterCreation'
import Greetings from './pages/Greetings'
import Training from './pages/Training'

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Route path="/" exact>
          <Greetings />
        </Route>
        <Route path="/creation" exact>
          <CharacterCreation />
        </Route>
        <Route path="/training" exact>
          <Training />
        </Route>
      </div>
    </BrowserRouter>
  )
}

export default App;
