import React, { useEffect, useState } from 'react'
import { IpoAdmin } from '../components/IpoAdmin'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Getinvestment } from '../components/getinvestment';
import { PreLoader } from '../components/PreLoader';

export const Investment = () => {

    const [loader, setloader] = useState(true);

    return (
        <>
            <div className="market-page">
                <div className="container">
                    <div className="row">
                        <NavBar />
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            <Getinvestment setloader={setloader} />

                        </div>
                        <div className="col-md-4">
                            <div className="market-order">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loader && <PreLoader />}
            <Footer />
        </>
    )
}
