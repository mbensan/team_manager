import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'


import PlayersList from './views/PlayersList';
import CreatePlayer from './views/CreatePlayer';
import Game from './views/Game'
import Menu from './components/Menu';
import Login from './views/Login';
import Register from './views/Register';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Menu></Menu>
        <header className="">
          <Routes>
            <Route default path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
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