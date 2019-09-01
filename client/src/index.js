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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import './global.css'

/**
 * React-laodable es un HOC
 */
const App = Loadable({
  loader: () => import('./container/App'),
  //loading: () =>  <div>Loading...</div> // despues le pondremos un loading bonito
  loading: () => <div style={{ textAlign: 'center', marginTop: '5em' }}><CircularProgress /></div> 
})

// import App from './container/App'

const theme = createMuiTheme({
  typography: 16
})

const MyAwesomeReactComponent = ({history}) => (
  <MuiThemeProvider theme={theme}>
    <Router>
    <App history={history} />
  </Router>
  </MuiThemeProvider>
)

// FIRST
// ReactDOM.render(
//   <Router>
//     <App history={history} />
//   </Router>,
//   document.getElementById('app')
// )

ReactDOM.render(
  <MyAwesomeReactComponent history={history} />,
  document.getElementById('app')
)