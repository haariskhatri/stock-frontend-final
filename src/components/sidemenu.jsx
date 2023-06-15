import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PreLoader } from "./PreLoader";

const SideMenu = () => {

    const navigate=useNavigate();
    const [loader,setloader]=useState(false)

    const logout=()=>{
        setloader(true)
        fetch("/api/adminlogin/logout").then(res => res.json())
        .then(data => {
            if (data.success) {
                toast.success("LogOut")
                setloader(false)
                navigate('/admin')
            } else {
                setloader(false)
                toast.error('Error !')
            }
        })
    }

    return (
        <>
            <div className="side-menu">


                <ul className="list-unstyled">
                    <li><NavLink to='/adminhome' > <i className="fa-solid fa-house"></i> Home</NavLink></li>
                    <li><NavLink to='/register' ><i className="fa-solid fa-square-plus"></i>Add IPO</NavLink></li>
                    <li><NavLink to='/admincompony' ><i className="fa-solid fa-hand-holding-hand"></i>IPO Allocation</NavLink></li>
                    {/* <li><NavLink to='/dsa' >Item</NavLink></li> */}
                    <li><button onClick={logout} ><i className="fa-solid fa-right-from-bracket"></i>Log Out</button></li>
                </ul>
            </div >
                <ToastContainer/>
                {
                    loader && <PreLoader/>
                }
        </>
    )
}

export default SideMenu;