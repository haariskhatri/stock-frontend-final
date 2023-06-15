import React from 'react'
import '../App.css'

const ProgressBar = ({ details }) => {
    return (
        <>
            <div className="performance-progress-bar">
                <div className="row">
                    <div className="col-lg-2">

                        <div className="performance-bar-metrics">
                            {details.left} <br />
                            <span className='metric-value'>10</span>
                        </div>
                    </div>
                    < div className="col-lg-8">
                        <div className="progress-component">

                            <div className="progress-bar" />
                            <i className="fa-solid fa-caret-up" style={{ color: 'white' }}></i>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="performance-bar-metrics">
                            {details.right}<br />
                            <span className='metric-value'> {details.right_value}</span>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default ProgressBar;