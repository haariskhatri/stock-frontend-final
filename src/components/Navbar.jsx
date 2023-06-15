import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/Logo.png'
import WalletIcon from '@mui/icons-material/Wallet';
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react";
import io from 'socket.io-client'
import { Getinvestment } from '../components/getinvestment';
import { PreLoader } from "./PreLoader";
const socket = io("https://api-tradetrek.onrender.com", {
    autoConnect: false
});



const NavBar = (props) => {
    const navigate = useNavigate()

    const [active, setactive] = useState(null)
    const [userbalance, setuserbalance] = useState();
    const [loader, setloader] = useState(false);




    const logout = () => {
        setloader(true)
        fetch("/api/login/logout")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setloader(false)
                    navigate('/')
                } else {
                    toast.error('Error !')
                }
                setloader(false)
            })
    }

    useEffect(() => {
        checklogin()
    }, [])

    const checklogin = () => {
        setloader(true)
        fetch("/api/login/checksession")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setloader(false)
                } else {
                    setloader(false)
                    navigate('/')
                    toast.error('Login First')
                }
            })
    }

    useEffect(() => {

        socket.connect();
        axios.get(`/api/user/getuserbalance`).then((data) => {
            setuserbalance(data.data)
            console.log('initial', data.data);
        })

        socket.on('userbalance', () => {
            console.log('update');
            axios.get(`/api/user/getuserbalance`).then((data) => {
                setuserbalance(data?.data)
            })
        })

        return () => {
            socket.off('userbalance');
        }
    }, [socket])




    return (
        <>
            <div className="stock-nav">
                <div className="container">
                    <nav>
                        <div className="logo">
                            <Link to='/home'><img src={logo} alt="" /></Link>
                        </div>
                        <div className="logo-title">
                            <h4>TradeTrek</h4>
                        </div>
                        {/* <NavBar>
                            <Link>Explore</Link>
                            <Link>Investment</Link>
                            <Link>Explore</Link>

                        </NavBar> */}
                        {/* <nav className="list-unstyled">
                            <NavLink to='/home'>Explore</NavLink>
                            <NavLink to='/Investment'>Investment</NavLink>
                            <NavLink to='/History'>History</NavLink>
                        </nav> */}
                        <ul className="list-unstyled">
                            <li><NavLink to='/home'>Explore</NavLink></li>
                            <li><NavLink to='/Investment'>Investments</NavLink></li>
                            <li><NavLink to='/History'>History</NavLink></li>



                        </ul>

                        <div className="search-bar">
                            <input type="text" placeholder="What are you searching for ?" />
                            <SearchIcon />
                        </div>
                        <div className="wallet">
                            <WalletIcon style={{ color: "white" }} />

                            <div className="wallet-balance">
                                Current Balance : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(userbalance)}

                            </div>
                        </div>
                        <div className="logout-button">
                            <button onClick={logout}><i className="fa-solid fa-right-from-bracket" > </i>Log Out</button>
                        </div>
                    </nav>
                </div>
                <ToastContainer />
                {
                    loader && <PreLoader />
                }
            </div>
        </>
    )
}

export default NavBar;