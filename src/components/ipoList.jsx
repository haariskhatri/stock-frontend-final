import React from 'react'

import '../assets/css/ipo-cards.css'
import NavBar from './Navbar'
import { Iposubscribe } from './iposubscribe'

export const IpoList = () => {
    return (
        <>
            <NavBar />
            <div className="ipo-list">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">

                            <div className="ipo-list-container">
                                <div className="ipo-list-title">
                                    <img src='/public/ADN.png' className='img-fluid' alt='logo' />
                                    <div className='ipo-name'>Adani (ADN)</div>
                                    <div className="ipo-price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(100)}</div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">
                            <Iposubscribe />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
