import React from 'react'
import '../assets/css/preloader.css'

export const PreLoader = () => {
    return (
        <><div className="preloader">

            <div className="loader">
                <div className="cell d-0"></div>
                <div className="cell d-1"></div>
                <div className="cell d-2"></div>
                <div className="cell d-1"></div>
                <div className="cell d-2"></div>
                <div className="cell d-2"></div>
                <div className="cell d-3"></div>
                <div className="cell d-3"></div>
                <div className="cell d-4"></div>
            </div>
        </div>
        </>
    )
}
