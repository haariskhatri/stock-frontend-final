import React,{useEffect, useState} from 'react'
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import { Getipolist } from '../components/getipolist';
import { GetShares } from '../components/GetShares';
import { BuySellShares } from '../components/BuySellShares';

export const GetSharesList = () => {
    const [sharesdata,setsharesdata]=useState([]);
    
    useEffect(()=>{
        console.log(sharesdata)
    },[sharesdata])

  return (
    <>
    <div className="market-page">
        <div className="container">
            <div className="row">
                <NavBar />
            </div>
            <div className="row">
                <div className="col-md-8">

                    <GetShares setsharesdata={setsharesdata}/>

                </div>
                <div className="col-md-4">
                    <div className="market-order">
                        <BuySellShares sharesdata={sharesdata}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</>
  )
}
