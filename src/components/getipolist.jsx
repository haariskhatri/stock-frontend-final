import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PreLoader } from './PreLoader';


export const Getipolist = ({ setipodata }) => {
   
    const navigate=useNavigate();

    const [data, setData] = useState([]);
    const [loader,setloader]=useState(true);
   

    useEffect(() => {
        getipo()
        setloader(false)
    }, [])

    const getipo = () => {
        fetch("/api/ipo/getipo")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(!data.success) {
                    alert(data.message)
                    navigate('/Userlogin')
                } else{
                
                    setData(data)
                }
            })
    }

    const getsingleipo = (componyid) => {
        fetch("/api/ipo/singleipo/" + componyid)
        .then(response => response.json())
        .then(data => {
            if(!data.success) {
                alert(data.message)
                navigate('/Userlogin')
            } else{
                setipodata(data)
            }
        })

    }

    return (

        <div className='container'>



            {data?.ipo?.map((ipo, key) => {
                console.log(data);
                return (

                    <div className="card ipoadmin" key={key}>
                        <h5 className="card-title">{ipo.companyName}</h5>

                        <div className="card-body">
                            <h5 className="card-title">Bid Date :{ipo.companyStartdate} -{ipo.companyEnddate}</h5>
                           
                            <p className="card-text">Min Shares :{ipo.companySlotSize}</p>

                            <div className='buy-button'>

                                <button className="btn btn-primary" onClick={async () => { getsingleipo(ipo.companyId) }}>Apply</button>

                            </div>

                        </div>
                    </div>

                )
            })

            }
            {loader &&

                <PreLoader/>
            }
        </div>


    )
}

