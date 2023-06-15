import { useState } from 'react'
import NavBar from '../components/Navbar';
import CreateIPO from '../components/CreateIPO';
import SideMenu from '../components/sidemenu';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PreLoader } from '../components/PreLoader';


const IpoRegister = () => {
    const navigate=useNavigate()
    const [loader,setloader]=useState(false);

    useEffect(()=>{
        document.title = 'IPO Register'
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
                setloader(false)
                navigate('/')
                toast.error('Only Admin Can Access')
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
                            <CreateIPO />
                        </div>
                    </div>
                </div>
                <Footer />
                {
                    loader && <PreLoader/>
                }
            </div>

        </>
    )
}

export default IpoRegister;
