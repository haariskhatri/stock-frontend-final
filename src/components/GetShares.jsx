import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { PreLoader } from './PreLoader';

export const GetShares = ({setsharesdata}) => {

    var shareId;
    const [data, setData] = useState([]);
   const navigate=useNavigate()
   const [loader,setloader]=useState(true);
    
    useEffect(() => {
        getshares()
            
    }, [])

    const getshares=()=>{
        fetch("api/shares/getshares")
        .then(response => response.json())
        .then(data => {
            if(!data.success) {
                alert(data.message)
                navigate('/Userlogin')
            } else{
                setData(data)
                loader(false)
            }
        })
    }

    const getsingleshares=()=>{
        fetch("api/shares/singleshares/" + shareId)
        .then(response => response.json())
            .then(data => {
                if(!data.success) {
                    alert(data.message)
                    navigate('/Userlogin')
                } else{
                    setsharesdata(data)
                }
            })
        
    }
  return (
    <div className='container'>
               
                    
    {data?.shares?.length && (
        data?.shares?.map((shares, key) => {
            console.log(shares)
            return (
                
                    <div className="card ipoadmin" key={key}>
                        <h5 className="card-title">{shares.shareName}</h5>
                        
                        <div className="card-body">
                            <h5 className="card-title">Symbol :{shares.shareSymbol} </h5>
                           

                            <div className='buy-button'>

                                <button className="btn btn-primary" onClick={() => { shareId = shares.shareId; getsingleshares() }}>Buy</button>

                            </div>

                        </div>
                    </div>
                
            )
        })
    )
    }
{
    loader && <PreLoader/>
}
</div>
  )
}
