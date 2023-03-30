import './App.css';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'


import PlayersList from './views/PlayersList';
import CreatePlayer from './views/CreatePlayer';
import Game from './views/Game'



function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="nav">
          <div className="nav-item">
            <Link to={'/'}>Manejar Jugadores</Link>
          </div>
          {'  '}
          <div className="nav-item">
            <Link to={'/status/game/1'}>Manejar Status</Link>
          </div>
        </div>
        <header className="">
          <Routes>
            <Route path='/' element={<PlayersList />}></Route>
            <Route path='/players/addplayer' element={<CreatePlayer />}></Route>
            <Route path='/status/game/:num' element={<Game />}></Route>
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;