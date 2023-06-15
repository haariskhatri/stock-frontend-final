import React, { useEffect, useState } from 'react'
import '../assets/css/marketdepth.css';
import { LinearProgress } from '@mui/material';


const Marketdepth = ({ depth }) => {

	var buysum = 0;
	depth[0].forEach(ele => {
		buysum += ele.price * ele.shares;
	});

	var sellsum = 0;
	depth[1].forEach(ele => {
		sellsum += ele.price * ele.shares;
	});

	const buypercent = depth[0].length === 0 ? 0 : ((depth[0].length / (depth[0].length + depth[1].length)) * 100).toFixed(2);
	const sellpercent = depth[1].length === 0 ? 0 : ((depth[1].length / (depth[0].length + depth[1].length)) * 100).toFixed(2);

	console.log(depth[0].length);

	return (

		<>
			<div className="market-depth">
				<div className="market-depth-title">
					Market Depth
				</div>

				<div className="market-depth-progess">
					<div className="progress-1" style={{ width: `${buypercent}%` }} />
					<div className="progress-2" style={{ width: `${sellpercent}%` }} />
				</div>

				<div className="percentage">
					<div className="buy">
						Buy : {buypercent} %
					</div>
					<div className="sell">
						Sell : {sellpercent} %
					</div>
				</div>


				<div className="row">
					<div className="col-md-6">
						<div className="table-responsive">
							<table className='table'>

								<thead>
									<tr>
										<th>
											Bid Price
										</th>
										<th className='text-end'>
											Qty
										</th>
									</tr>
								</thead>

								<tbody>
									{depth[0].map((ele, index) => {
										return (
											<tr key={index}>
												<td>{ele.price}</td>
												<td className='text-end' style={{ 'color': '#0abb92' }}>{new Intl.NumberFormat('en-IN').format(ele.shares)}</td>
											</tr>
										)
									})
									}
									<tr className='lower-row'>
										<td className='amount-data'>Total Bid : </td>

										<td className='text-end'>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(buysum)}</td>
									</tr>
								</tbody>

							</table>
						</div>


					</div>

					<div className="col-md-6">
						<div className="table-responsive">
							<table className='table'>

								<thead>
									<tr>
										<th>
											Ask Price
										</th>
										<th className='text-end'>
											Qty
										</th>
									</tr>
								</thead>

								<tbody>
									{depth[1].map((ele, index) => {
										return (
											<tr key={index}>
												<td>{ele.price}</td>
												<td className='text-end' style={{ color: '#d55438' }}>{new Intl.NumberFormat('en-IN').format(ele.shares)}</td>
											</tr>
										)
									})
									}
									<tr className='lower-row'>
										<td className='amount-data'>Total Bid : </td>
										<td className='text-end'>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(sellsum)}</td>
									</tr>
								</tbody>

							</table>

						</div>

					</div>
				</div >
			</div>
		</>
	)
}

export default Marketdepth;