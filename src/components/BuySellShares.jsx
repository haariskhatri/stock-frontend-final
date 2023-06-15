import React, { useEffect, useState } from "react";

export const BuySellShares = ({sharesdata}) => {
    
	const [atmarket, setatmarket] = useState('At Market');

	const [stock, setstock] = useState({
		stockQuantity: '',
		stockPriceLimit: ''
	})

	const [ismarket, setismarket] = useState(false);

	const handlechange = (event) => {
		const { name, value } = event.target;

		setstock((prev) => {
			return { ...prev, [name]: value }
		})
	}
    return (
        <>
            <div className="buy-sell-card">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{sharesdata?.singleshare?.shareName}</h5>
                        <p className="card-text">{sharesdata?.singleshare?.sharePrice}</p>
                    </div>

                    <div className="card-main-body">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Buy</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Sell</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
								<form >
									<div className="row">
										<div className="col-lg-12">
											<div className="buy-menu">
												<div className="stock-quantity">

													<label htmlFor="stockQuantity">Quantity NSE</label>
													<input type="number" name="stockQuantity" value={stock.stockQuantity} onChange={handlechange} autoFocus />
												</div>

												{ismarket ?
													<div className="stock-price-limit price-market">
														<label onClick={() => { setismarket(false) }} style={{ cursor: "pointer" }} >Price Market </label>
														<input type="text" name="stockPriceLimit" defaultValue={atmarket} readOnly />
													</div>
													:
													<div className="stock-price-limit">
														<label onClick={() => { setismarket(true) }} style={{ cursor: "pointer" }}>Price Limit</label>
														<input type="number" name="stockPriceLimit" value={stock.stockPriceLimit} onChange={handlechange} />
													</div>
												}

											</div>
											<div className="order-execute-line">
												<p>Order will be executed at {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stock.stockPriceLimit ? stock.stockPriceLimit : 0)} or lower price</p>
											</div>

											<div className="buy-footer">
												<p>Balance : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(0)} </p>
												<p>Required : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stock.stockQuantity * stock.stockPriceLimit)} </p>
											</div>

											<div className="buy-button">
												<button>
													BUY
												</button>
											</div>


										</div>
									</div>
								</form>
							</div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                                <form >
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="buy-menu">
                                                <div className="stock-quantity">

                                                    <label htmlFor="stockQuantity">Quantity NSE</label>
                                                    <input type="number" name="stockQuantity" value={stock.stockQuantity} onChange={handlechange} autoFocus />
                                                </div>

                                                {ismarket ?
                                                    <div className="stock-price-limit price-market">
                                                        <label onClick={() => { setismarket(false) }} style={{ cursor: "pointer" }} >Price Market </label>
                                                        <input type="text" name="stockPriceLimit" defaultValue={atmarket} readOnly />
                                                    </div>
                                                    :
                                                    <div className="stock-price-limit">
                                                        <label onClick={() => { setismarket(true) }} style={{ cursor: "pointer" }}>Price Limit </label>
                                                        <input type="number" name="stockPriceLimit" value={stock.stockPriceLimit} onChange={handlechange} />
                                                    </div>
                                                }

                                            </div>
                                            <div className="order-execute-line">
                                                <p>Market is closed </p>
                                            </div>

                                            <div className="sell-footer">
                                                <p>Balance : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(0)} </p>
                                            </div>

                                            <div className="sell-button">
                                                <button>
                                                    SELL
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

        </>
    )
}
