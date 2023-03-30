import { Link } from 'react-router-dom';

function SubMenu() {
    return (
        <h3>
            <Link to={'/'}>Lista</Link>
            {'  '}|{'  '}
            <Link to={"/players/addplayer"}>Añadir Jugador</Link>
        </h3>
    );
}

export default SubMenu;