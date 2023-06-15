import React, { useEffect } from "react";
import MarketOrder from "../components/BuySellCard";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import RelianceLogo from '../assets/reliance-logo.png'
import StockChart from "../components/StockChart";
import CompanyProfile from "../components/CompanyProfile";
import PerformanceComponent from "../components/PerformanceComponent";
import FundamentalsComponent from "../components/FundamentalsComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PreLoader } from "../components/PreLoader";

import io from 'socket.io-client'
import Marketdepth from "../components/Marketdepth";
const socket = io("https://api-tradetrek.onrender.com", {
    autoConnect: false
});


const MarketPage = () => {

    const { companyId } = useParams();
    const [company, setcompany] = useState()
    const [showloader, setloader] = useState(true);
    const [prices, setprices] = useState();
    const [depth, setdepth] = useState([[
        {
            price: '',
            shares: '',
            socketId: '',
            stockId: '',
            userEmail: '',
            userId: ''
        }
    ], [
        {
            price: '',
            shares: '',
            socketId: '',
            stockId: '',
            userEmail: '',
            userId: ''
        }
    ]]);

    const addComa = (data) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data)
    }




    // useEffect(() => {

    //     axios.post('/api/share/getshare', { 'shareId': companyId }).then((data) => {
    //         console.log(data.data);
    //         setcompany(data.data);
    //         setloader(false);
    //         // document.title = `${company.companyName} Share Price Today`
    //     })
    // }, [])

    useEffect(() => {
        // nothing
        var once = 0;

        socket.connect();
        socket.on('updatestock', async (data) => {

            setcompany(data);
        })

        socket.emit('getstock', companyId);


        socket.on('priceupdate', (data) => {
            setprices(prev => data);
        })



        socket.on('updateorder', (data) => {
            setdepth(data);
            console.log(data);
        })

        socket.on('priceupdate', (data) => {
            setprices(data);
        })

        socket.on('takestock', (data) => {
            setcompany(data);
            console.log(data)
            socket.emit('getupdate', data.shareSymbol);
            socket.emit('getprices', data.shareSymbol);
            setloader(false);
        })


        return () => {
            socket.off('updatestock');
            socket.off('updateorder');
            socket.off('takestock');
            socket.off('priceupdate')
        }
    }, [socket])


    return (
        <>
            {company ?
                <div className="market-page">
                    <div className="container">
                        <div className="row">
                            <NavBar />
                        </div>
                        <div className="row">
                            <div className="col-md-8">

                                <div className="company-info">
                                    <img src={`/public/${company.shareSymbol}.png`} />
                                </div>

                                <div className="company-detail">
                                    <div className="company-name">
                                        {company.shareName} ({company.shareSymbol}) <br />
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(company.sharePrice)}
                                    </div>
                                    <div className="company-category">
                                        {company.category}
                                    </div>


                                </div>
                                <StockChart prices={prices} />
                                <Marketdepth depth={depth} />
                                <PerformanceComponent />
                                <FundamentalsComponent />
                                <div style={{ color: '#b0b2ba' }}>
                                    Understanding Fundamentals <i className="fa-solid fa-circle-info"></i>
                                </div>


                                <CompanyProfile description={company.description} name={company.shareName} />



                            </div>
                            <div className="col-md-4">
                                <div className="market-order">
                                    <MarketOrder company={company} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>Company Not Found</>
            }
            {showloader && <PreLoader />}
            <Footer />

        </>
    )
}

export default MarketPage;