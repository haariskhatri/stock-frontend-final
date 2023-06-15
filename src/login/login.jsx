import React, { useEffect, useState } from 'react'
import '../App.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client'
import { OtpPage } from '../components/OtpPage';
import { useNavigate } from 'react-router-dom';
import { PreLoader } from '../components/PreLoader';
import axios from 'axios';



// const socket = io("ws://localhost:4000");
export const Login = () => {
  const [data, setdata] = useState('')
  const [loader, setloader] = useState(false);
  const [otppage, setotppage] = useState(false)
  const navigate = useNavigate()
  const [user, setuser] = useState({
    'userName': '',
    'email': '',
    'password': ''
  })

  const handlechange = (e) => {
    const { name, value } = e.target;

    setuser((prev) => {
      return { ...prev, [name]: value }
    })
  }

  useEffect(() => {
    setloader(true)

    fetch('/api/login/checksession').
      then(response => response.json())
      .then(data => {
        if (data.success) {
          setloader(false)
          navigate('/home')
        }
      })
    setloader(false)
  }, [])

  const login = (e) => {
    e.preventDefault();
    setloader(true)
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value

    const response = fetch('/api/login/login', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        password: pass
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then((data) => {
        if (data.success) {
          setloader(false)
          navigate('/home')
        } else {
          setloader(false)
          toast.error('Invalid Credentials')
        }
      })
  }

  const signup = async (e) => {
    e.preventDefault();
    console.log(user);

    const response = await axios.post('/api/signup/signup', user);
    console.log(response)
    if (response.data == true) {
      setotppage(true);
    }
    else if (response.data == false) {
      toast.error('Email Already in Use')
    }

  }


  return (
    <>


      <div className='body-login container-fluid'>
        <div className="main-login col-8">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup-login">
            <form onSubmit={signup}>
              <label className='label-login' htmlFor="chk" aria-hidden="true">Sign up</label>
              <input type="text" className='input-login' id='userName' name="userName" onChange={handlechange} value={user.userName} placeholder="User name" required autoFocus />
              <input type="email" className='input-login' name="email" onChange={handlechange} value={user.email} id="email-signup" placeholder="Email" required />
              <input type="password" className='input-login' name="password" onChange={handlechange} value={user.password} id="pass-signup" placeholder="Password" required />
              <button className='button-login' type='submit'>Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={login} >
              <label className='label-login' htmlFor="chk" aria-hidden="true">Login</label>
              <input type="email" className='input-login' name="email" id="email" placeholder="Email" required />
              <input type="password" className='input-login' name="pass" id="pass" placeholder="Password" required />
              <button className='button-login' type='submit'>Login</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
      {
        otppage && <OtpPage setotppage={setotppage} />
      }
      {
        loader && <PreLoader />
      }

    </>

  )
}
