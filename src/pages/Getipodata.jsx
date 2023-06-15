import React,{useEffect, useState} from 'react'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Getipolist } from '../components/getipolist';
import { Iposubscribe } from '../components/iposubscribe';


export const Getipodata = () => {
    const [ipodata,setipodata]=useState([]);
    
    useEffect(()=>{
        console.log(ipodata)
    },[ipodata])

  return (
    <>
    <div className="market-page">
        <div className="container">
            <div className="row">
                <NavBar />
            </div>
            <div className="row">
                <div className="col-md-8">

                    <Getipolist setipodata={setipodata}/>

                </div>
                <div className="col-md-4">
                    <div className="market-order">
                        <Iposubscribe ipodata={ipodata}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</>
  )
}
