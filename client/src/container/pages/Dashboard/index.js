import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// install npm install --save-dev @material-ui/icons
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress'
import { KcalList } from 'component'

import styles from './styles.module.css'

const HOST = process.env.API_URL

class Dashboard extends Component {
  state = {
    items: [],
    loading: false,
    error: null
  }
  // OLD
  // constructor(props) {
  //   super(props)
  //   this.goToAddCalories = this.goToAddCalories.bind(this)
  // }

  componentDidMount () {
    this.load()
  }


  async load () {
    this.setState({
      loading: true,
      error: null
    })
    try {
      const items = (await axios.get(`${HOST}/api/meals`)).data
      this.setState({
        loading: false,
        items
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message
      })
    }
  }
 
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

  getDetail = uuid => e => {
    e && e.preventDefault()
    this.props.history.push(`/detail/${uuid}`)
  }

  render () {
    const {items, loading, error} = this.state

    if (loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )
    }

    const ErrorMsg = <p className={styles.error}>{error}</p>
    const List = error ? ErrorMsg : <KcalList items={items} onClick={this.getDetail} />

    return(
        <div className={styles.container}>
          <h1 className={styles.title}>Consumo de calorías</h1>
          <div className={styles.section}>
            {List}
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