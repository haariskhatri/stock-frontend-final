import React, { useEffect, useState } from 'react'
import '../assets/css/sharelist.css'
import axios from 'axios';
import { PreLoader } from './PreLoader';
import { StockTable } from './StockTable';
import { Getinvestment } from './getinvestment';
import NavBar from './Navbar';
import Footer from './Footer';

export const SharesList = () => {

    const [company, setcompany] = useState();
    const [loader, setloader] = useState(true);

    useEffect(() => {
        axios.get('/api/share/getshares').then((data) => {
            console.log(data.data);
            setcompany(data.data)
            setloader(false)
        })
    }, [])

    return (
        <>
            <div className="share-list">

                <NavBar />

                <div className="stocks-table">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <StockTable topshares={company} />
                            </div>
                            <div className="col-md-4">
                                <Getinvestment />
                            </div>
                        </div>
                    </div>
                </div>
                {loader && <PreLoader />}
                <Footer />
            </div>
        </>
    )
}
