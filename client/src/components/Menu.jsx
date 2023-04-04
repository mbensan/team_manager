import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {

  const navigate = useNavigate()

  const [items, setItems] = useState([
    {
      text: 'Manejar Jugadores',
      path: '/',
      active: true
    },
    {
      text: 'Manejar Estado',
      path: '/status/game/1',
      active: false
    }
  ])

  function setActive(path) {
    setItems(items.map(item => {
      if (item.path === path) {
        return {
          text: item.text,
          path: item.path,
          active: true
        }
      }
      else {
        return {
          text: item.text,
          path: item.path,
          active: false
        }
      }
    }))
  }

  function salir() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="row">
      <div className="col-10">
        <ul className="nav nav-tabs">
          {items.map((item, idx) => 
            <li className="nav-item">
              <Link key={idx} onClick={() => setActive(item.path)} className={`nav-link ${item.active ? 'active': ''}`} aria-current="page" to={item.path}>{item.text}</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="col-2">
        <button onClick={salir} className="btn btn-warning">Salir</button>
      </div>
    </div>
  );
}

export default Menu;