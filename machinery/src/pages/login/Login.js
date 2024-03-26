import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { userLoginLifeCycle } from '../../redux/slices/userLoginSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const [user, setUser] = useState({
    userType: "",
    email: "",
    password: ""
  })


  function handleUser(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  function handleLogin(e) {
    e.preventDefault()
    dispatch(userLoginLifeCycle(user)).then((result) => {
      if (result.payload.message === "login success") {
        // If the login was successful, navigate to the home page
        navigate('/');
      }
      else {
        toast.error(result.payload.message, {
          position: "top-right",
          autoClose: 2000,
        })
      }
    });
  }

  return (
    <div className="login m-auto mt-5">
      <div className='card container p-4' id="login-container">
        <div className='text-center'>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className='text-center'>
            <div className='mb-3 d-flex justify-content-evenly'>
              <div>
                <input className="form-check-input" type="radio" name="userType" id="customer" value="customer" onChange={handleUser} />
                <label htmlFor="customer">&ensp;Customer</label>
              </div>
              <div>
                <input className="form-check-input" type="radio" name="userType" id="seller" value="seller" onChange={handleUser} />
                <label htmlFor="seller">&ensp;Seller</label>
              </div>
            </div>
            <div>
              <input className="form-control mb-3" type='email' name="email" placeholder='Email Address' onChange={handleUser} />
            </div>
            <div>
              <input className="form-control mb-3" type='password' name="password" placeholder='Password' onChange={handleUser} />
            </div>
            <button className="btn btn-dark" type='submit'>Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login