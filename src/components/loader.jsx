import React from "react";

const Loader = () => {

    return (
        <>
            <div className="loader-outer">

                <div className="loader">
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__ball"></div>
                </div>
            </div>
        </>
    )
}

export default Loader;