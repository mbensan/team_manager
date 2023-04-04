import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login (ev) {
    ev.preventDefault()
    try {
      const resp = await axios.post(window.$api + '/auth/login', {
        email, password
      })
      // si el login fué exitoso, guardamos la credencial en localStorage
      localStorage.setItem('token', resp.data.token)
      // y redirigimos a la pantalla principal
      navigate('/')
    }
    catch(err){
      alert(err.response.data.error)
      return
    }

    
  }

  return (
    <div className="row">
      <div className="col-4 offset-4">
        <h3 className="text-center">Ingresa al Sistema</h3>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={ev => setPassword(ev.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Loguearse</button>
        </form>
        <p className="text-right">No tienes una cuenta: <Link to={'/register'}>Regístrate</Link></p>
      </div>
    </div>
  );
}

export default Login;