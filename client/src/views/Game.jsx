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

  async function setGame(_id, numGame, newStatus) {
    await axios.put(window.$api + `/players/${_id}/games/${numGame}`, {
      value: newStatus
    })
    const player = players.find(pla => pla._id === _id)
    player['game' + num] = newStatus
    const index = players.findIndex(pla => pla._id === _id)
    setPlayers([
      ...players.slice(0, index),
      player,
      ...players.slice(index+1)
    ])
  }

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
                      onClick={() => setGame(player._id, num, 'playing')}
                      className={player['game'+num] === 'playing' ? 'btn btn-success': 'btn btn-light'}>
                        Jugando
                    </button>
                    <button
                      onClick={() => setGame(player._id, num, 'not_playing')}
                      className={player['game'+num] === 'not_playing' ? 'btn btn-danger': 'btn btn-light'}>
                        No Jugando
                    </button>
                    <button
                      onClick={() => setGame(player._id, num, 'undefined')}
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