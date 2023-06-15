import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import fs from 'fs';
import { useRef } from 'react';
import io from 'socket.io-client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


const CreateIPO = () => {

    const addIpo = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('companySymbol', company.companySymbol.toUpperCase());
        formdata.append('companyLogo', e.target.companyLogo.files[0]);



        const data = {
            companyId: company.companyId,
            companyName: company.companyName.trimStart().charAt(0).toUpperCase() + company.companyName.trimStart().slice(1),
            companyLogo: '',
            companyCategory: company.companyCategory.trimStart().charAt(0).toUpperCase() + company.companyCategory.trimStart().slice(1),
            companySymbol: (company.companySymbol.toUpperCase()).trimStart(),
            companyShares: (company.companyShares).trimStart(),
            companyValuepershare: (company.companyValuepershare).trimStart(),
            companySlotSize: (company.companySlotSize).trimStart(),
            companyMaximumSlotsAllowed: (company.companyMaximumSlotsAllowed).trimStart(),
            companyValuation: '',
            companyStartdate: company.companyStartdate,
            companyEnddate: company.companyEnddate,
            companyDescription: company.companyDescription.trimStart().charAt(0).toUpperCase() + company.companyDescription.trimStart().slice(1)
        }
        const exists = await axios.post('/api/ipo/checkipo', { name: company.companyName, stock: company.companySymbol });

        if (exists.data === true) {
            toast.error('Exists');
        }

        else {


            const saved = await axios.post('/api/ipo/addipo', data)
            const image = await axios.post('api/ipo/uploadlogo', formdata);

            console.log(saved.data, '  ', image.data);
            if (saved.data && image.data == true) {

                toast.success('IPO Added')

                setCompany({
                    companyId: '',
                    companyName: '',
                    companyLogo: '',
                    companyCategory: '',
                    companySymbol: '',
                    companyShares: '',
                    companyValuepershare: '',
                    compantSlotSize: '',
                    companyMaximumSlotsAllowed: '',
                    companyValuation: '',
                    companyStartdate: '',
                    companyEnddate: '',
                    companyDescription: ''
                })
            }
        }

    }

    const companyLogo = useRef();

    const [company, setCompany] = useState({
        companyId: '',
        companyName: '',
        companyLogo: '',
        companyCategory: '',
        companySymbol: '',
        companyShares: '',
        companyValuepershare: '',
        companySlotSize: '',
        companyMaximumSlotsAllowed: '',
        companyValuation: '',
        companyStartdate: '',
        companyEnddate: '',
        companyDescription: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;



        if (name == 'companyStartdate' || name == 'companyEnddate') {
            const date = new Date(value).toISOString().split('T')[0];
            console.log(value + " " + date);
            setCompany((prev) => {
                return { ...prev, [name]: date }
            })
        }

        else {

            setCompany((prev) => {
                return { ...prev, [name]: value }
            })
        }
    }

    useEffect(() => {

        const func = async () => {

            const id = await axios.get('/api/ipo/getid');

            if (id.data.success == false) {
                <Navigate to='/' />
            }




            setCompany((prev) => {
                return { ...prev, ['companyId']: id.data }
            })
        }
        func()
    }, [company])

    return (
        <>
            <div className="create-ipo">
                <form className='ipo-form' onSubmit={addIpo} >



                    <div className="col-lg-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder=" " readOnly
                                value={company.companyId}
                            />
                            <label htmlFor="floatingInput">IPO ID</label>
                        </div>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                            name='companyName'
                            onChange={handleChange}
                            value={company.companyName} autoFocus
                        />
                        <label htmlFor="floatingInput">Company Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                            name='companySymbol'
                            onChange={handleChange}
                            value={company.companySymbol}
                        />
                        <label htmlFor="floatingInput">Company Symbol</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" " required

                            name='companyCategory'
                            onChange={handleChange}
                            value={company.companyCategory}
                        />
                        <label htmlFor="floatingInput">Category</label>
                    </div>



                    <div className="form-floating mb-3">
                        <label htmlFor="formFile" className="form-label">Logo</label>
                        <input className="form-control" type="file" id="formFile" ref={companyLogo}
                            name='companyLogo'
                            value={company.companyLogo}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="col-lg-12">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder=" " required

                                name='companyValuation'
                                onChange={handleChange}
                                value={(new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((company.companyShares * company.companyValuepershare) / 10000000) + ' Cr')}

                            />
                            <label htmlFor="floatingInput">Valuation</label>
                        </div>
                    </div>



                    <div className="row">

                        <div className="col-lg-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companyShares'
                                    onChange={handleChange}
                                    value={company.companyShares}
                                />
                                <label htmlFor="floatingInput">Shares</label>
                            </div>

                        </div>
                        <div className="col-lg-6">

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companyValuepershare'
                                    onChange={handleChange}
                                    value={company.companyValuepershare}
                                />

                                <label htmlFor="floatingInput">Value Per Share</label>
                            </div>

                        </div>

                        {/* <div className="col-lg-12">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " readOnly

                                    value={(new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((company.companyShares * company.companyValuepershare) / 10000000) + 'Cr')}

                                />
                                <label for="floatingInput">Valuation</label>
                            </div>
                        </div> */}

                        <div className="col-lg-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companySlotSize'
                                    onChange={handleChange}
                                    value={company.companySlotSize}
                                />
                                <label htmlFor="floatingInput">Lot Size</label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " readOnly
                                    name='companyMaximumSlotSize'
                                    value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(company.companySlotSize * company.companyValuepershare)}
                                />
                                <label htmlFor="floatingInput">Lot Value</label>
                            </div>

                        </div>



                        <div className="col-lg-12">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companyMaximumSlotsAllowed'

                                    onChange={handleChange}

                                    value={company.companyMaximumSlotsAllowed}

                                />
                                <label htmlFor="floatingInput">Maximum Slot Amount Allowed Per User</label>
                            </div>
                        </div>


                        <div className="col-lg-6">
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companyStartdate'
                                    onChange={handleChange}
                                    value={company.companyStartdate}
                                />
                                <label htmlFor="floatingInput">Start Date</label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="floatingInput" placeholder=" " required
                                    name='companyEnddate'
                                    onChange={handleChange}
                                    value={company.companyEnddate}
                                />
                                <label htmlFor="floatingInput">Deadline</label>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="floatingInput" placeholder=" " style={{ height: '200px' }} required
                                    name='companyDescription'
                                    onChange={handleChange}
                                    value={company.companyDescription}
                                />
                                <label htmlFor="floatingInput">Description</label>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <button className='form-submit-btn' type='submit'>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <ToastContainer />
            </div>



        </>
    )
}


export default CreateIPO;