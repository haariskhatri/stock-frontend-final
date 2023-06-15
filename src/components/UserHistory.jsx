import React, { useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios';

import io from 'socket.io-client'
import { PreLoader } from './PreLoader';
const socket = io("https://api-tradetrek.onrender.com", {
    autoConnect: false
});

export const UserHistory = () => {
    const [data, setData] = useState();
    const [id, setid] = useState();
    const [loader, setloader] = useState(false)

    useEffect(() => {
        gethistory();

        socket.connect();
        axios.get('/api/login/usernow').then((data) => {
            setid(data.data.id)
            console.log(data.data.id);
            socket.emit('investment', data.data.id);


        })
    }, [])

    const gethistory = () => {
        setloader(true)
        fetch("/api/trade/history")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (!data.success) {
                    alert(data.message)
                    setloader(false)
                    navigate('/Userlogin')
                } else {
                    console.log(data);
                    setloader(false)
                    setData(data)
                }
            })
    }


    return (
        <>
            <div className="stock-table table-responsive investment-card">
                <h5 className='card-title'> History</h5>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Share</th>
                            <th >Price</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.userhistory.map((ele, index) => (
                                <tr key={index}>



                                    <td>{ele.stock}</td>
                                    <td style={{ color: '#0abb92' }}>
                                        {ele.priceLimit}
                                    </td>
                                    <td>
                                        {ele.shares}
                                    </td>
                                    <td>
                                        {moment(ele.date).format("DD-MM-YYYY")}
                                    </td>
                                    <td>
                                        {moment(ele.date).format("HH:mm:ss")}
                                    </td>
                                    {ele.sellerId === id ?

                                        <td style={{ color: "#d55438" }}>Sell</td>
                                        :
                                        <td style={{ color: "#0abb92" }}>Buy</td>
                                    }



                                </tr>
                            ))}

                    </tbody>
                </table>

            </div>
            {loader && <PreLoader />}
        </>
    )
}
