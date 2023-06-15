import React,{useEffect, useState} from 'react'
import { IpoAdmin } from '../components/IpoAdmin'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SideMenu from '../components/sidemenu';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PreLoader } from '../components/PreLoader';



export const Adminipo = () => {
    const navigate=useNavigate()
    const [loader,setloader]=useState(false);
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
                toast.error('You Are Not Admin')
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
                            <IpoAdmin />
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
