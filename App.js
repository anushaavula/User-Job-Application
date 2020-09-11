import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Dashboard from './users/Dashboard'
import Application from './users/Application'

function App(){
    return(
        <BrowserRouter>
            <div> 
          <Route path="/" component={Application} exact={true}/>
          <Route path="/admin" component={Dashboard}/>
           
           </div>
           </BrowserRouter>
    )
}

export default App