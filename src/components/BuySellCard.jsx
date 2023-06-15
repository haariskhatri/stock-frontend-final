import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import io from 'socket.io-client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const socket = io("https://api-tradetrek.onrender.com", {
	autoConnect: false
});


const BuySellCard = ({ company }) => {


	// const socket = io('/api', {
	// 	autoConnect: false
	// });




	const [atmarket, setatmarket] = useState('At Market');
	const [userid, setuserid] = useState();
	const [useremail, setuseremail] = useState();
	const [detail, setdetail] = useState();


	const [buystock, setbuystock] = useState({
		stockId: '',
		stockQuantity: '',
		stockPriceLimit: ''
	})

	const [sellstock, setsellstock] = useState({
		stockId: '',
		stockQuantity: '',
		stockPriceLimit: ''
	})

	const [ismarket, setismarket] = useState(false);

	const handlebuychange = (event) => {
		const { name, value } = event.target;

		setbuystock((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const handlesellchange = (event) => {
		const { name, value } = event.target;

		setsellstock((prev) => {
			return { ...prev, [name]: value }
		})
	}

	useEffect(() => {
		setatmarket(company?.sharePrice)
		const user = axios.get('/api/login/usernow').then((data) => {
			console.log(data);
			setuserid(data.data.id)
			setuseremail(data.data.email)
		})
		console.log(company);
	}, [])

	const buyStock = async (e) => {
		e.preventDefault();

		console.log(company.shareSymbol)
		if (ismarket === true && company.shareSymbol != null) {
			const price = await axios.post('/api/share/getsharewithsymbol', { 'share': company.shareSymbol });
			const data = {
				socketId: socket.id,
				stockId: company.shareSymbol,
				userId: userid,
				userEmail: useremail,
				shares: buystock.stockQuantity,
				price: price.data.sharePrice
			}

			socket.emit('buyOrder', data);
		}
		else {
			const data = {
				socketId: socket.id,
				stockId: company.shareSymbol,
				userId: userid,
				userEmail: useremail,
				shares: buystock.stockQuantity,
				price: buystock.stockPriceLimit
			}

			socket.emit('buyOrder', data);
		}







	}
	useEffect(() => {

		socket.connect();

		socket.on('buysuccess', () => {
			toast.success('Buy Request succesful ')
			console.log("Success");
			setbuystock({

				stockId: '',
				stockQuantity: '',
				stockPriceLimit: ''

			})
		})
		socket.on('sellsuccess', () => {
			toast.success('Sell Request succesful ! ')

			setsellstock({

				stockId: '',
				stockQuantity: '',
				stockPriceLimit: ''
			})
		})

		socket.emit('givedetail');

		socket.on('detail', (data) => {
			setdetail(data);
			console.log(data);
		})



		socket.on('invalid', () => {
			toast.error('Insufficent Share Balance')
		})


		return () => {
			socket.off('buysuccess');
			socket.off('sellsuccess');
			socket.off('detail')
			socket.off('invalid')

		}
	}, [socket])


	const sellOrder = async (e) => {
		e.preventDefault();

		// detail.forEach(ele => {
		// 	if (ele.shareSymbol === company.shareSymbol) {

		// 		const data = {
		// 			socketId: socket.id,
		// 			stockId: company.shareSymbol,
		// 			userId: userid,
		// 			userEmail: useremail,
		// 			shares: sellstock.stockQuantity,
		// 			price: sellstock.stockPriceLimit
		// 		}

		// 		socket.emit('sellOrder', data);

		// 	}
		// })

		if (ismarket === true && company.shareSymbol != null) {
			const price = await axios.post('/api/share/getsharewithsymbol', { 'share': company.shareSymbol });
			const data = {
				socketId: socket.id,
				stockId: company.shareSymbol,
				userId: userid,
				userEmail: useremail,
				shares: sellstock.stockQuantity,
				price: price.data.sharePrice
			}

			socket.emit('sellOrder', data);
		}
		else {
			const data = {
				socketId: socket.id,
				stockId: company.shareSymbol,
				userId: userid,
				userEmail: useremail,
				shares: sellstock.stockQuantity,
				price: sellstock.stockPriceLimit
			}

			socket.emit('sellOrder', data);
		}



	}

	// useEffect(() => {
	// 	socket.connect();

	// 	socket.emit('createorder', {})

	// 	return () => {
	// 		socket.off()
	// 	}
	// }, [socket])


	return (
		<>
			<div className="buy-sell-card">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{company.shareName} ({company.shareSymbol})</h5>
						<p className="card-text">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(company.sharePrice)} </p>
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
								<form onSubmit={buyStock}>
									<div className="row">
										<div className="col-lg-12">
											<div className="buy-menu">

												<div className="stock-quantity">

													<label htmlFor="stockQuantity">Quantity NSE</label>
													<input type="number" name="stockQuantity" value={buystock.stockQuantity} onChange={handlebuychange} autoFocus min='0' />
												</div>

												{ismarket ?
													<div className="stock-price-limit price-market">
														<label onClick={() => { setismarket(!ismarket) }} style={{ cursor: "pointer" }} >Price Market <KeyboardArrowDownIcon /></label>
														<input type="text" name="stockPriceLimit" value='At Market' readOnly />
													</div>
													:
													<div className="stock-price-limit">
														<label onClick={() => { setismarket(!ismarket) }} style={{ cursor: "pointer" }}>Price Limit <KeyboardArrowDownIcon /></label>
														<input type="number" name="stockPriceLimit" value={buystock.stockPriceLimit} onChange={handlebuychange} min='0' />
													</div>
												}

											</div>
											<div className="order-execute-line">
												<p>Order will be executed at {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(buystock.stockPriceLimit ? buystock.stockPriceLimit : 0)} or lower price</p>
											</div>

											<div className="buy-footer">
												<p>Balance : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(0)} </p>
												<p>Required : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(buystock.stockQuantity * buystock.stockPriceLimit)} </p>
											</div>

											<div className="buy-button">
												<button type="submit">
													BUY
												</button>
											</div>


										</div>
									</div>
								</form>
							</div>

							<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
								<form onSubmit={sellOrder}>
									<div className="row">
										<div className="col-lg-12">
											<div className="buy-menu">



												<div className="stock-quantity">

													<label htmlFor="stockQuantity">Quantity NSE</label>
													<input type="number" name="stockQuantity" value={sellstock.stockQuantity} onChange={handlesellchange} autoFocus min='0' />
												</div>

												{ismarket ?
													<div className="stock-price-limit price-market">
														<label onClick={() => { setismarket(false) }} style={{ cursor: "pointer" }} >Price Market <KeyboardArrowDownIcon /></label>
														<input type="text" name="stockPriceLimit" value='At Market' readOnly />
													</div>
													:
													<div className="stock-price-limit">
														<label onClick={() => { setismarket(true) }} style={{ cursor: "pointer" }}>Price Limit <KeyboardArrowDownIcon /></label>
														<input type="number" name="stockPriceLimit" value={sellstock.stockPriceLimit} onChange={handlesellchange} min='0' />
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
												<button type="submit">
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
			<ToastContainer />
		</>
	)
}


export default BuySellCard;