import React, { useEffect, useState } from 'react'
import { PreLoader } from './PreLoader';

export const Getinvestment = ({ setloader }) => {
    const [data, setData] = useState();

    useEffect(() => {
        getipo()

    }, [])

    const getipo = () => {
        fetch("/api/user/getinvestment")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
              const users = data.user;

              Object.filter = (obj, predicate) => 
              Object.assign(...Object.keys(obj)
                              .filter( key => predicate(obj[key]) )
                              .map( key => ({ [key]: obj[key] }) ) );
              
                var filtered = Object.filter(users, user=> user > 0);
                
              
                

                const newdata = {
                    total : data.total,
                    price : data.price,
                    user: filtered

                }
                setData(newdata)
                console.log(newdata);
                setloader(false)
            })
    }

    return (
        <div className='container'>
            <div className="card ipoadmin investment-card">
                <h5 className="card-title text-center">Your Investment</h5>
                <div className="card-body">
                    <div className="card-body-inner">
                        <div className="table-responsive">
                            <table className="table card-title mb-0">
                                <thead>
                                    <tr>
                                        <th>Stocks</th>
                                        <th>Quantity</th>
                                        <th>Current</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data &&
                                        Object.keys(data?.user).map(function (key) {
                                            return (
                                                <tr className='stock-list-item' key={key}>
                                                    <td className="card-title">{key}</td>
                                                    <td className="card-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.user[key])}</td>

                                                    <td className="card-text investment">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(data?.price[data?.price.findIndex(x => x.shareSymbol === key)].sharePrice.toFixed(2))}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                    <div className='card-title p-0 total-investment'>
                        Total Investment : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(data?.total.toFixed(2))}
                    </div>
                </div>
            </div>
        </div>
    )
}
