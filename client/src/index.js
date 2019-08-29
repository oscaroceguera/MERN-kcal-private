import React from 'react'
import ReactDOM from 'react-dom'
/**
 * Es un Router que utliza el API de history
 * HTML5 para mantener sincronizada nuestro
 * UI con la URL del browser
 */
import { BrowserRouter as Router } from 'react-router-dom'
/**
 * React-laodable para codding-spliting
 */
import Loadable from 'react-loadable'
import './global.css'

/**
 * React-laodable es un HOC
 */
const App = Loadable({
  loader: () => import('./container/App'),
  loading: () => <div>Loading...</div> // despues le pondremos un loading bonito
})

// import App from './container/App'

ReactDOM.render(
  <Router>
    <App history={history} />
  </Router>,
  document.getElementById('app')
)