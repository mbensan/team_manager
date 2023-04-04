import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [pass_confirm, setpass_confirm] = useState('')

  async function login (ev) {
    ev.preventDefault()
    try {
      const resp = await axios.post(window.$api + '/auth/register', {
        email, password, name, pass_confirm
      })
      const resp2 = await axios.post(window.$api + '/auth/login', {
        email, password
      })
      localStorage.setItem('token', resp2.data.token)
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
        <h3 className="text-center">Registrese en el Sistema</h3>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
            <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ev => setName(ev.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={ev => setPassword(ev.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirme Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={ev => setpass_confirm(ev.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
      </div>
      <p className="text-right">Ya tienes una cuenta: <Link to={'/login'}>Ingresa</Link></p>
    </div>
  );
}

export default Register;