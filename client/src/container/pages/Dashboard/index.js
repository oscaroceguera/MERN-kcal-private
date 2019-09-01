import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import styles from './styles.module.css'

// install npm install --save-dev @material-ui/icons
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

class Dashboard extends Component {
  // OLD
  // constructor(props) {
  //   super(props)
  //   this.goToAddCalories = this.goToAddCalories.bind(this)
  // }
 
  /**
   * Para poder usar propiedades estaticas de una clase y
   * usar propiedades sin necesidad de inicializarlas en el constructor
   * necesitamos instalar https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
   * "plugins": ["@babel/plugin-proposal-class-properties"]
   */
  goToAddCalories = e => {
    e && e.preventDefault()
    this.props.history.push('/add-calories')
  }

  // OLD
  // goToAddCalories (e) {
  //   e && e.preventDefault()
  //   this.props.history.push('/calories')
  // }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Consumo de calorías</h1>
        <div className={styles.section}>
          <h3>Listado de calorías consumidas</h3>
          <div className={styles.containerBtns}>
            <Fab
              size='medium'
              color='primary'
              aria-label='Add'
              onClick={this.goToAddCalories}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard