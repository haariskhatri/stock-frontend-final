import React,{useEffect, useState} from 'react'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SideMenu from '../components/sidemenu';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PreLoader } from '../components/PreLoader';


export const AdminDetailsPage = () => {
    const [loader,setloader]=useState(false);
    const navigate=useNavigate()
    useEffect(()=>{
        checkadmin();
    },[])
    const checkadmin=()=>{
        setloader(true)
        fetch("/api/adminlogin/checkadmin")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setloader(false)
            } else {
                navigate('/admin')
                setloader(false)
                toast.error('Error !')
            }
        })
    }
    return (
        <>
             <div className="ipo-register">
                <div className="container">
                  
                    <div className="row">
                        <div className="col-md-3">
                            <SideMenu />
                        </div>
                        <div className="col-md-9">
                           <h1 className='card-title'>Welcome Back Admin</h1>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer/>
            {
                loader && <PreLoader/>
            }
        </>
    )
}
