import React, { useEffect, useState } from "react";
import { PreLoader } from "./PreLoader";


export const Iposubscribe = ({ ipodata }) => {
    
    const [loader,setloader]=useState(false);
    
    const iposubcall = (e) => {
        setloader(true)
        e.preventDefault()
         fetch('/api/ipo/iposub', {
            method: 'post',
            body: JSON.stringify({
              ipo_id:ipodata?.singleipo.companyId,
              minimumslot:ipodata?.singleipo?.companySlotSize
            }),
            headers: {
              'Content-type': 'application/json'
            }
          }).then(response => response.json())
          .then(data => {
              
              console.log(data);
                alert(data.message)
              setloader(false)

          })
    }

    return (
        <>
            <div className="container">
                <div className="buy-sell-card">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{ipodata?.singleipo?.companyName}</h5>

                        </div>

                        <div className="card-main-body">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Bid</button>

                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                    <form  onSubmit={iposubcall}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="buy-menu">
                                                    <div className="stock-quantity">

                                                        <label htmlFor="stockQuantity">Shares</label>
                                                        <input type="number" name="stockQuantity" value={ipodata?.singleipo?.companySlotSize} readOnly />
                                                    </div>


                                                    <div className="stock-price-limit price-market">
                                                        <label>Bid Price</label>
                                                        <input type="text" name="stockPriceLimit" value={ipodata?.singleipo?.companyValuepershare} readOnly />
                                                    </div>


                                                </div>
                                                <div className="order-execute-line">
                                                    <p>Order will be executed for {ipodata?.singleipo?.companySlotSize} Shares</p>
                                                </div>

                                                <div className="buy-footer">
                                                    <p>Balance : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(0)} </p>
                                                    <p>Required : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(ipodata?.singleipo?.companyValuepershare * ipodata?.singleipo?.companySlotSize)} </p>
                                                </div>

                                                <div className="buy-button">
                                                    <button >
                                                        Subscribe
                                                    </button>
                                                </div>


                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                {loader && <PreLoader/>}
            </div>
        </>
    )
}
