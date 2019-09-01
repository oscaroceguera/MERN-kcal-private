import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { container } from './styles.module.css'

import Loadable from 'react-loadable'
import CircularProgress from '@material-ui/core/CircularProgress'

/**
 * Creamos una funcion para abstraer el HOC
 * de loadable y se aplique a todas nuestras rutas.
 * Si no tendriamos que hacerlo para todas las rutas y poes
 * Dont repeat your selft
 */
const dynamicImport = importingComponent => (
  Loadable({
    loader: importingComponent,
    loading: () => <div style={{ textAlign: 'center', marginTop: '5em' }}><CircularProgress /></div> 
  })
)

// FIRTS: import Dashboard from './pages/Dashboard'
const Dashboard = dynamicImport(() => import('./pages/Dashboard'))
// FIRTS:  import Calories from './pages/Calories'
const Calories = dynamicImport(() => import('./pages/Calories'))
// FIRTS:  import Summary from './pages/Summary'
const Summary = dynamicImport(() => import('./pages/Summary'))
// FIRTS:  import NoMatch from './pages/NoMatch'
const NoMatch = dynamicImport(() => import('./pages/NoMatch'))

const App = (props) => {
  const {history} = props

  return (
    <div className={container}>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/add-calories' component={Calories} />
        <Route path='/summary' component={Summary} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App