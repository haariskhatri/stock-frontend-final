import React from 'react'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserHistory } from '../components/UserHistory';


export const History = () => {
    return (
        <>
            <div className="market-page">
                <div className="container">
                    <div className="row">
                        <NavBar />
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            <UserHistory/>

                        </div>
                        <div className="col-md-4">
                            <div className="market-order">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
