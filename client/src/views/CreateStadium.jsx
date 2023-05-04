import { useState } from "react";
import axios from "axios";

function CreateStadium() {

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)

  function saveImage (ev) {
    console.log(ev.target); 
    setImage(ev.target.files[0])
  }

  async function addStadium (ev) {
    ev.preventDefault()

    const datos = new FormData()
    datos.append('name', name)
    datos.append('image', image)

    const resp = await axios({
      method: 'post',
      url: window.$api + '/stadiums',
      data: datos,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(resp);
  }

  return (
    <section>
      <div className="row">
        <div className="col-4 offset-4">
          <h3 className="text-center">Crear un Estadio</h3>
          <form onSubmit={addStadium}>
            <div className="form-data">
              <label htmlFor="name">Nombre:</label>
              <input type="text" name="name" id="name" required onChange={ev => setName(ev.target.value)} />
            </div>
            <div className="form-data">
              <label htmlFor="image">Imagen:</label>
              <input type="file" name="image" id="image" required onChange={saveImage} />
            </div>
            <div className="form-data">
              <input type="submit" value='Añadir' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateStadium;