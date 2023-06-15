import React from 'react'
import ProgressBar from './ProgressBar';
import '../App.css'
import FundamentalsComponent from './FundamentalsComponent';
import CompanyProfile from './CompanyProfile';

const PerformanceComponent = () => {

    const details = {
        left: `Today's Low`,
        left_value: '10.00',
        right: `Today's High`,
        right_value: '20.00'
    }

    const comp2 = {
        left: `52W Low`,
        left_value: '50.00',
        right: `52W High`,
        right_value: '30.00'
    }

    return (
        <>
            <div className="performance-component">
                <div className="performance-title titles">
                    Performance <i className="fa-solid fa-circle-info"></i>
                </div>
                <div className="bar-section">
                    <ProgressBar details={details} />
                    <ProgressBar details={comp2} />
                </div>

                <div className="row details-row">
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Open
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Close
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Volume
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Total traded volume
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                </div>

                <div className="row details-row ">
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Upper Circuit
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                    <div className="col-lg-3 share-details">
                        <div className="details-title">
                            Lower Circuit
                        </div>
                        <div className="details-value">
                            10
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3"></div>
                </div>



            </div>


        </>
    )
}

export default PerformanceComponent;