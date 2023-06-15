import React from 'react'

export const Financials = () => {
    return (
        <div className='container my-3'>
            <div><h3>Financials</h3></div>
            <div className='financial-card'>
                <div>

                <div><h4>Revenue</h4></div>
                </div>
                <div>
                    <div className='right-align my-3'>
                        *all value in cr
                    </div>
                </div>
                <div>
                <div className=' my-3'>
                    <div className='font-white col-2'>118</div>
                    <div className="financials-bar my-2"> </div>
                    <hr/>
                    <div className='font-white'>2019</div>
                    
                </div>
                
                </div>
            </div>
        </div>
    )
}
