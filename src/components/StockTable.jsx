import React from 'react'

import '../assets/css/stock-table.css';
import { Link } from 'react-router-dom';

export const StockTable = ({ topshares }) => {
    return (
        <>
            <div className="stock-table table-responsive">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className='text-end'>Market Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            topshares?.map((ele, index) => (

                                <tr key={index}>


                                    <td><Link to={`/detail/${ele.shareId}`}>{ele.shareName}</Link></td>
                                    <td className='text-end' style={{ color: '#0abb92' }}>
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(ele.sharePrice)}
                                    </td>


                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}
