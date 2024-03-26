import React from 'react'
import { useState } from 'react'
import './RequestQuotationForm.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestQuotationForm() {

    const { currentUser } = useSelector(state => state.userLogin);
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state;
    let [request, setRequest] = useState({
        productInfo: product,
        userInfo: {
            name: currentUser.firstName + " " + currentUser.lastName,
            email: currentUser.email,
            mobile: currentUser.mobile,
            companyName: "",
            address: {
                address1: "",
                address2: "",
                city: "",
                state: "",
                country: ""
            }
        }
    })


    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "companyName") {
            setRequest({ ...request, userInfo: { ...request.userInfo, [name]: value } })
        }
        else {
            setRequest({
                ...request,
                userInfo: {
                    ...request.userInfo,
                    address: { ...request.userInfo.address, [name]: value }
                }
            })
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let res = await axios.post("http://localhost:4000/quotation-api/requestQuotation", request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data === "request successfull") {
                toast.success(`Product Request is Send Successfully`, {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/quotationreport');
                    }
                })
            }
            else {
                toast.error(`invalid request`, {
                    position: "top-right",
                    autoClose: 1000,
                })
            }

        }
        catch (error) {
            toast.error(`Try After Some Time`, {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/home');
                }
            })
        }
    }

    return (
        <div className='requsetQuotation'>
            <div className="card container w-sm-75 mt-5" id='requsetQuotation-product'>
                <div className="row m-3">
                    <div className="col-md">
                        <img src={product.image} height="200px" width="200px" alt="noimage" />
                    </div>
                    <div className="col-md ">
                        <div className="card-body">
                            <div className="row">
                                <div className='col my-2 fs-3 font-weight-bold'>
                                    {product.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col fs-5 ">
                                    {product.discription}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col fs-5">
                                    {product.brand}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col fs-5 text-danger">
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card container w-sm-75 my-4 ' id='requsetQuotation-form'>
                <form className='m-3' onSubmit={handleSubmit}>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="name">Name:</label>
                        </div>
                        <div className="col">
                            <span className="form-control" name="name" id="name" >{currentUser.firstName + " " + currentUser.lastName}</span>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="col">
                            <span className="form-control" name='email' id='email'>{currentUser.email}</span>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="mobile">Mobile</label>
                        </div>
                        <div className="col">
                            <span className="form-control" name="mobile" id='mobile'>{currentUser.mobile}</span>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="companyName">Company Name:</label>
                        </div>
                        <div className="col">
                            <input className="form-control" name='companyName' id='companyName' placeholder='Enter Company Name' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="companyAddress1">Address line 1</label>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="address1" id="companyAddress1" placeholder="Enter Flat no" onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="companyAddress2">Address line 2</label>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="address2" id="companyAddress2" placeholder="Enter Area" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="city" id="city" placeholder="Enter city" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="state">State</label>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="state" id="state" placeholder="Enter State" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col">
                            <label htmlFor="country">Country</label>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="country" id="country" placeholder="Enter Country" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row my-3 d-flex justify-content-between'>
                        <div className="col-2">
                            <button className="btn btn-danger" onClick={(e) => {
                                e.preventDefault();
                                navigate(-1)
                            }}>Cancel</button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default RequestQuotationForm;
