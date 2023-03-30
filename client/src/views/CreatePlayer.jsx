import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import SubMenu from "../components/SubMenu";

function CreatePlayer() {

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')

  const [errors, setErrors] = useState('')

  const navigate = useNavigate()

  async function createPlayer(ev) {
    ev.preventDefault()

    //console.log({name, position});
    try {
      const newPlayer = await axios.post(window.$api + '/players', {
        name: name,
        position: position
      })
      alert('Jugador agregado correctamente')
      navigate('/')
    }
    catch(err) {
      const errors = err.response.data.errors
      if (errors.name) {
        // dejarlo más bonito
        setErrors(errors.name.message)
      }
    }
  }

  return (
    <section>
      <SubMenu></SubMenu>
      <div className="row">
        <div className="col-8 offset-2">
          {errors == '' ? '' : 
            <div class="alert alert-danger" role="alert">
              {errors}
            </div>
          }
          <form onSubmit={createPlayer}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input required type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={ev => setName(ev.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Posición</label>
              <input type="text" required className="form-control" id="position" aria-describedby="emailHelp" onChange={ev => setPosition(ev.target.value)} />
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreatePlayer;