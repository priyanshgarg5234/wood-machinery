import { useState } from "react";
import "./Register.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  let navigate = useNavigate();
  let [user, setUser] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    username: '',
    email: '',
    password: '',
    userType: ''
  })
  let [err, setErr] = useState({})

  function handleUser(event) {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value })
  }

  function handleregistration(event) {
    event.preventDefault()
    let errors = ValidateUser(user);
    if (Object.keys(errors).length === 0) {
      setErr({})
      onUserRegistration()
    }
    else {
      setErr(errors)
    }
  }

  async function onUserRegistration() {
    try {
      let res = await axios.post(`http://localhost:4000/user-api/user`, user)
      if (res.status === 200) {
        if (res.data.message === 'User already existed' || res.data.message === "Seller already existed") {
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 2000,
          })
        } else {
          toast.error(res.data.message + ": Try after some time", {
            position: "top-right",
            autoClose: 5000,
          })
        }
      }
      else {
        toast.success(`${res.data.payload.firstName} your ${res.data.payload.userType} profile is created successfully`, {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate('/login');
          }
        })
      }
    }
    catch (err) {
      setErr({ httpError: "*" + err.message })
    }
  }



  return (
    <div>
      <div className='card container my-4   ' id="register-container">
        <div>
          <h1 className="text-center mb">Register</h1>
        </div>
        {err.httpError && <small className="text-danger">{err.httpError}</small>}

        <form className='mt-3' onSubmit={handleregistration}>
          <div className=" row name mb-2">
            <div className="col-6">
              <input className='form-control' type="text" name="firstName" placeholder="First Name" onChange={handleUser} />
              {err.firstName && <small className="text-danger">{err.firstName}</small>}
            </div>
            <div className="col-6">
              <input className='form-control' type="text" name="lastName" placeholder="Last Name" onChange={handleUser} />
              {err.lastName && <small className="text-danger">{err.lastName}</small>}
            </div>
          </div>
          <div className="mb-2">
            <input className='form-control' type='text' name="username" placeholder='User Name' onChange={handleUser} />
            {err.username && <small className="text-danger">{err.username}</small>}
          </div>
          <div className="mb-2">
            <input className='form-control' type="text" name="mobile" placeholder="Mobile" onChange={handleUser} />
            {err.mobile && <small className="text-danger">{err.mobile}</small>}
          </div>
          <div className="mb-2">
            <input className='form-control' type='text' name="email" placeholder='Email Address' onChange={handleUser} />
            {err.email && <small className="text-danger">{err.email}</small>}
          </div>
          <div className="mb-2">
            <input className='form-control' type='password' name="password" placeholder='Password' onChange={handleUser} />
            {err.password && <small className="text-danger">{err.password}</small>}
          </div>
          <div className="row mb-2">
            <div className="col-sm">
              <label htmlFor="userType">Type Of User:</label>
            </div>
            <div className="col-sm">
              <input className='form-check-input' type="radio" id="coustomer" name="userType" value="customer" onChange={handleUser} />&ensp;Customer
            </div>
            <div className="col-sm">
              <input className='form-check-input' type="radio" id="seller" name="userType" value="seller" onChange={handleUser} />&ensp;Seller
            </div>
            {err.userType && <small className="text-danger">{err.userType}</small>}
          </div>
          <div className="text-center">
            <button className="btn btn-dark mt-2" type='submit'>Register</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register

function ValidateUser(user) {
  let errors = {}

  if (!user.firstName) {
    errors.firstName = '*First name is required'
  }
  else if (!/^[A-Za-z\s]+$/.test(user.firstName)) {
    errors.firstName = '*First name should only contain alphabets'
  }

  if (!user.lastName) {
    errors.lastName = '*Last name is required'
  }
  else if (!/^[A-Za-z\s]+$/.test(user.lastName)) {
    errors.lastName = '*Last name should only contain alphabets'
  }

  if (!user.username) {
    errors.username = '*User name is required'
  } else if (!/^[a-zA-Z0-9]+$/.test(user.username)) {
    errors.username = '*Username should only contain alphabets and numbers'
  }

  if (!user.mobile) {
    errors.mobile = '*Mobile No. is required'
  } else if (!/^\d{10}$/.test(user.mobile)) {
    errors.mobile = '*Enter a valid 10-digit mobile number '
  }

  if (!user.email) {
    errors.email = '*Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = '*Enter a valid email'
  }
  if (!user.password) {
    errors.password = '*Password is required'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/.test(user.password)) {
    errors.password = '*Password length[6-10], 1 Number, 1 capital and 1 Small alphabet is required'
  }
  if (!user.userType) {
    errors.userType = "*User type is required"
  }
  return errors;
}
