import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'

function Game() {

  const [players, setPlayers] = useState([])

  const {num} = useParams()

  useEffect(
    () => {
      axios.get(window.$api + '/players')
      .then(resp => {
        setPlayers(resp.data.players)
      })
    },
    []
  )

  return (
    <section>
      <div className="menu">
        <h3>Configurando Juego {num}</h3>
      </div>
      <div className="submenu">
        <div className="d-inline-block p-2">
          <Link to={'/status/game/1'}>Juego 1</Link>
        </div>
        <div className="d-inline-block p-2">
          <Link to={'/status/game/2'}>Juego 2</Link>
        </div>
        <div className="d-inline-block p-2">
          <Link to={'/status/game/3'}>Juego 3</Link>
        </div>
      </div>
      <div className="row">
        <div className='col-8 offset-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => 
                <tr key={player._id}>
                  <td>{player.name}</td>
                  <td>
                    <button
                      onClick={() => console.log(player._id)}
                      className={player['game'+num] === 'playing' ? 'btn btn-success': 'btn btn-light'}>
                        Jugando
                    </button>
                    <button
                      onClick={() => console.log(player._id)}
                      className={player['game'+num] === 'not_playing' ? 'btn btn-danger': 'btn btn-light'}>
                        No Jugando
                    </button>
                    <button
                      onClick={() => console.log(player._id)}
                      className={player['game'+num] === 'undefined' ? 'btn btn-warning': 'btn btn-light'}>
                        Indefinido
                    </button>
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

export default Game;