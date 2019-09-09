import React from 'react'
import axios from 'axios'
import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const HOST = process.env.API_URL

const inlStyles = {
  root: {
    margin: '1em auto',
    textAlign: 'center',
    background: 'white',
    width: '50%'
  }
}

// first: Antes de refactorizar
// explicar auqi se que repite el comportamiento
class Day extends React.Component {
  state = {
    items: [],
    loading: false,
    error: null
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    this.setState({
      loading: true,
      error: null
    })

    try {
      const items = await axios.get(`${HOST}/api/summary/byDay`).then(res => res.data)
      this.setState({
        loading: false,
        items
      })

    } catch (error) {
      this.setState({
        loading: true,
        error: error.message
      })
    }
  }

  render() {
    const { items } = this.state
    const { classes } = this.props

    const message = (item) => {
      const { day, month, year, quantityMeals, totalKcal } = item

      const newDate = new Date(`${year}`, `${month}`, `${day}`) // convertimos a formato fecha
      const fomartDate = format(newDate, 'dd MMMM yyyy', { locale: esLocale }) // lo transformamos con idioma
      const date = `El ${fomartDate}` // el dia

      const quantity = `registraste ${quantityMeals} comida${quantityMeals > 1 ? 's' : ''}`
      const total = `con un total de ${totalKcal} calorías`

      return (
        <p>
          {`${date} ${quantity} ${total}`}
        </p>
      )
    }

    return (
      <Paper className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {items.map((item, index) => {
            return (
              <div key={index} style={{ paddingTop: '1em' }}>
                {/* <ListItemText
                primary="El dia # registraste # comida(s) con un total de # calorías"
              /> */}
                <ListItemText
                  primary={message(item)}
                />
                <Divider />
              </div>
            )
          })}
        </List>
      </Paper>
    )
  }
}

export default withStyles(inlStyles)(Day)