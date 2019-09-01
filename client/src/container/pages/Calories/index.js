import React from 'react'
import axios from 'axios'
import format from 'date-fns/format'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import keycode from 'keycode'
import { DropDown, Autocomplete } from '../../../component'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles.module.css'

const HOST = process.env.API_URL

const initialState =  {
  meal: '',
  loading: false,
  error: null,
  mealCatalog: [],
  foodCatalog: [],
  mealType: '',
  date: '' || format(new Date(), 'yyyy-MM-dd'),
  inputValue: '',
  selectedItem: [],
  selectedFood: [],
}

// AUTOCOMPLETE
const getFoodUuid = (data, item) => data.find(i => i.label === item).uuid

class Calories extends React.Component {
  state = initialState

  /**
   * Metodo que se ejecuta justo despues de que el
   * componente haya sido montado en el DOM, este 
   * metodo es perfecto para integrar peticones ajax o establecer
   * alguntimer tipo setTimeout ò setInterval
   * 1. El nuevo algoritmo de reconciliación de react (fiber), puede iniciar o detener
   * el rendering según sea necesario. Si usas el evento componentWillMount será “no determinista”.
   * Significa que React llamará al evento componentWillMount muchas veces cuando lo desee.
   * 2. No se puede garantizar que la solicitud Ajax no se resuelva antes de
   * que se monte el componente. Entonces, hacer Ajax en componentDidMount garantizará
   * que hay un componente para actualizar.
   */
  componentDidMount() {
    this.load()
  }

  /**
  * necesitamos instalar un run-time https://babeljs.io/docs/en/babel-plugin-transform-runtime
  * en babelrc
  * Un complemento que permite la reutilización del
  * código auxiliar inyectado de Babel para ahorrar
  * en el tamaño del código.
  * nos permite usar async/await
  */
  async load() {
    // console.log('Me manda a llamar componentDidMount')
    /**
     * Mandamos a llamar por separado (FIRST) y despues almismo tiempo con Promise.all
     */

    this.setState({
      loading: true,
      error: null
    })

    try {
      // First: por separado "instalar axios"
      // const mealCatalog = await axios.get(`${HOST}/api/catalogs/mealtypes`)
      //   .then(res => res.data)
      // const foodCatalog = await axios.get(`${HOST}/api/catalogs/foodtypes`)
      //   .then(res => res.data)
      // console.log("TCL: Calories -> load -> mealCatalog", mealCatalog)
      // console.log("TCL: Calories -> load -> foodCatalog", foodCatalog)

      const [mealCatalog, foodCatalog] = await Promise.all([
        axios.get(`${HOST}/api/catalogs/mealtypes`).then(res => res.data),
        axios.get(`${HOST}/api/catalogs/foodtypes`).then(res => res.data)
      ])

      this.setState({
        loading: false,
        mealCatalog, // mismo que mealCatalog: mealCatalog
        foodCatalog
      })

    } catch (error) {
      // console.log("TCL: Calories -> load -> error", error)
      this.setState({
        error: error.message,
        loading: false
      })
    }
  }

  onChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  // AUTOCOMPLETE
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  // AUTOCOMPLETE
  handleChange = item => {
    let { selectedItem, selectedFood } = this.state

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item]
      selectedFood = [...selectedFood, getFoodUuid(this.state.foodCatalog, item)]
    }

    this.setState({
      inputValue: '',
      selectedItem,
      selectedFood
    })
  }

  // AUTOCOMPLETE
  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      })
    }
  }

  // AUTOCOMPLETE
  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem]
      const selectedFood = [...state.selectedFood]

      selectedItem.splice(selectedItem.indexOf(item), 1)
      selectedFood.splice(selectedFood.indexOf(getFoodUuid(this.state.foodCatalog, item)), 1)

      return {
        selectedItem,
        selectedFood
      }
    })
  }

  onSave = async (e) => {
    this.setState({ loading: true })

    const { meal, selectedFood, mealType, date } = this.state
    const data = { meal, foods: selectedFood, mealType, date }

    try {
      const response = await axios.post(`${HOST}/api/meals`, data)
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
  }

  render () {
    const {
      meal,
      loading,
      error,
      mealCatalog,
      foodCatalog,
      mealType,
      date,
      inputValue,
      selectedItem,
      selectedFood
    } = this.state
    
    // console.log("TCL: Calories -> render -> date", date)
    // SE TIENE QUE BORRAR TODO ESTO EN EL CURSO (nomas mostrarlos pero quitarlos rapido)
    // console.log("TCL: Calories -> render -> foodCatalog", foodCatalog)
    // console.log("TCL: Calories -> render -> mealCatalog", mealCatalog)
    // console.log("TCL: Calories -> render -> error", error)
    // console.log("TCL: Calories -> render -> loading", loading)
    // console.log("TCL: Calories -> render -> meal", meal)

    const disabled = !!meal && !!mealType && selectedItem.length > 0


    if (loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Agregar calorías</h1>
        {error
          ? <p className={styles.error}>{error}</p>
          : (
            <Paper elevation={1} className={styles.paper}>
              <TextField
                name='meal'
                label='Comida'
                margin='normal'
                style={{ width: '50%' }}
                value={meal}
                onChange={this.onChange}
                error={!meal}
              />
              {/*
                - Dropdown con meal-type (catalogo de alimento)
                - tenemos que cargar el cat de mealType
              */}
              <DropDown
                name='mealType'
                label='Tipo de comida'
                data={mealCatalog}
                onChange={this.onChange}
                value={mealType}
              />
              {/* instalr  date-fns/*/}
              <TextField
                id='date'
                name='date'
                label='Fecha'
                type='date'
                margin='normal'
                defaultValue={date}
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* AUTOCOMPLETE: instalar (downshift)*/}
              {/* AUTOCOMPLETE: instalar (npm install --save keycode) */}
              {/* https://gist.github.com/oscaroceguera/621a08f64e1b391059d5a0fc6bff1ccd */}
              <Autocomplete
                label='Alimentos'
                placeholder='Seleccione multiples alimentos'
                data={foodCatalog}
                inputValue={inputValue} // CREAR - inputValue
                selectedItem={selectedItem} // CREAR - selectedItem
                handleInputChange={this.handleInputChange} // CREAR - handleInputChange
                handleChange={this.handleChange} // CREAR - handleChange / usa getFoodUUId
                handleKeyDown={this.handleKeyDown} // CCREAR - handleKeyDown / instalar keycode
                handleDelete={this.handleDelete} // CREAR - handleDelete
              />
              <div className={styles.btnContainer}>
                <Button
                  disabled={!disabled}
                  name='mealType'
                  variant='contained'
                  color='secondary'
                  onClick={this.onSave}
                >
                  Guardar
                </Button>
              </div>
            </Paper>
          )
        }
      </div>
    )
  }
}

export default Calories