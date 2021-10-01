import React, { useState } from 'react'

import {BrowserRouter, Route} from "react-router-dom";
import {Order} from "./pages/Order";
import {InformationLib} from "./pages/InformationLib"
import {LibrariesContext} from "./store/LibrariesContext"
import {Loader} from "./components/Loader";
import './style.css'

export const App = () => {
  const librariesState = useState({libraries: [], loading: true})

  return (
    <LibrariesContext.Provider value={librariesState}>
      <LibrariesContext.Consumer>
        {([{loading}]) => loading && <Loader /> }
      </LibrariesContext.Consumer>
        <BrowserRouter>
          <Route path='/' exact component={Order}/>
          <Route path='/:region_id/:lib_id' exact component={InformationLib}/>
        </BrowserRouter>

    </LibrariesContext.Provider>)
}

