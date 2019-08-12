import React from 'react'
import { container, hello, helloDos, worldIcon } from './styles.module.css'

const App = () => {
  return (
    <div className={container}>
      <h1 className={hello}>
        ¡Hola Mundo! <br />
        <span className={worldIcon} />
      </h1>
    </div>
  )
}

export default App