import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios'

import SubMenu from '../components/SubMenu';


function PlayersList() {

  const [players, setPlayers] = useState([])

  useEffect(
    () => {
      axios.get(window.$api + '/players')
      .then(resp => {
        setPlayers(resp.data.players)
      })
    },
    []
  )

  async function eliminate(_id) {
    await axios.delete(window.$api + '/players/' + _id)
    const newPlayers = players.filter(pla => pla._id !== _id)
    setPlayers(newPlayers)
  }

  return (
    <section className="pagina">
      <SubMenu></SubMenu>
      <div className="row">
        <div className='col-8 offset-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Posición Preferida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => 
                <tr key={player._id}>
                  <td>1</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>
                    <button onClick={() => eliminate(player._id)} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

    </section>
  );
}

export default PlayersList;