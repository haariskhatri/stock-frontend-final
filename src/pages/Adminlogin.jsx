import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PreLoader } from '../components/PreLoader';
import '../assets/css/adminlogin.css'
import Logo from '../assets/Logo.png'

export const Adminlogin = () => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false)
  const [user, setuser] = useState({
    'email': '',
    'password': ''
  })

  const handlechange = (e) => {
    const { name, value } = e.target;

    setuser((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const login = (e) => {
    e.preventDefault()
    setloader(true)
    fetch('/api/login/adminlogin', {
      method: 'post',
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setloader(false)
          toast.success('Login Successfully')
          navigate('/register')

        } else {
          setloader(false)
          toast.error('Invalid Credentials')
        }
      })
  }

  return (
    <div>
      <div className="admin-logo">
        <img src={Logo} alt="logo" />
        <div className="name card-title">TradeTrek</div>
      </div>
      <div className="wrapper-admin">
        <div className="container-admin">
          <div className="col-left-admin">
            <h2 className="Admin-login-name">Admin Login</h2>
          </div>
          <div className="col-right-admin">
            <div className="login-form-admin">

              <form onSubmit={login}>
                <p>
                  <label>Email address<span>*</span></label>
                  <input type="text" placeholder="Email" name='email' onChange={handlechange} value={user.email} required />
                </p>
                <p>
                  <label>Password<span>*</span></label>
                  <input type="password" placeholder="Password" name='password' onChange={handlechange} value={user.password} required />
                </p>
                <p>
                  <input type="submit" value="Sign In" />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loader && <PreLoader />}
      <ToastContainer />
    </div>
  )
}
  