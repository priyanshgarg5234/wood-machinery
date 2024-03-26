import React, { useState } from 'react'
import "./RequestView.css"
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestView() {
    const navigate = useNavigate()
    const location = useLocation();
    const quotationRequest = location.state;
    let [quotationRes, setQuotationRes] = useState({
        rate: "",
        insurance: "",
        freightCharges: "",
        basic: "",
        igst: "",
        total: ""
    });

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setQuotationRes({ ...quotationRes, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            let res = await axios.put(`http://localhost:4000/quotation-api/setQuotationRes/${quotationRequest._id}`, quotationRes)
            toast.success(res.data, {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/quotation');
                }
            })
        }
        catch (error) {
            toast.success('unable send Quotation, Try after some time', {
                position: "top-right",
                autoClose: 1000,
            })
        }
    }

    return (
        <div className="container my-4 request-view-content">
            <div className="card container p-2">
                <div className='row mt-2'>
                    <div className="col product-image">
                        <img src={quotationRequest.quotationReq.productInfo.image} width={250} height={250} alt="Not found" />
                    </div>
                    <div className="col requestdetails">
                        <div className='fs-3 font-weight-bold'>Product Info</div>
                        <table className="table-sm  table-borderless ">
                            <tbody>
                                <tr>
                                    <td>Name </td><td>{quotationRequest.quotationReq.productInfo.name}</td>
                                </tr>
                                <tr>
                                    <td>Brand </td><td>{quotationRequest.quotationReq.productInfo.brand}</td>
                                </tr>
                                <tr>
                                    <td>Category</td><td>{quotationRequest.quotationReq.productInfo.category}</td>
                                </tr>
                                <tr>
                                    <td>Price</td><td style={{ color: "red" }}>${quotationRequest.quotationReq.productInfo.price}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='fs-3 font-weight-bold'>Customer Info</div>
                        <table className="table-sm table-borderless customer-info">
                            <tbody>
                                <tr>
                                    <td>Name</td><td>{quotationRequest.quotationReq.userInfo.name}</td>
                                </tr>
                                <tr>
                                    <td>Company Name</td><td>{quotationRequest.quotationReq.userInfo.companyName}</td>
                                </tr>
                                <tr>

                                    <td>Country</td><td>{quotationRequest.quotationReq.userInfo.address.country}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='card container mt-2 send-quotation'>
                <h2 className='text-center mt-2'>Add Quotation</h2>
                <form className='p-4' >
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="final-price">Rates</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="rate" id='final-price' value={quotationRequest.quotationRes.rate}/>:<input className="form-control" type="number" name="rate" id='final-price' onChange={handleChange} />}
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="insurance charges">Insurance Charges</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="insurance" id='insurance-charges' value={quotationRequest.quotationRes.insurance}/>:<input className="form-control" type="number" name="insurance" id='insurance-charges' onChange={handleChange} />}
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="freight-charges">Freight Charges</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="freightCharges" id='freight-charges' value={quotationRequest.quotationRes.freightCharges} />:<input className="form-control" type="number" name="freightCharges" id='freight-charges' onChange={handleChange} />}
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="basic-tax">Basic Tax</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="basic" id='basic-tax' value={quotationRequest.quotationRes.basic} />:<input className="form-control" type="number" name="basic" id='basic-tax' onChange={handleChange} />}
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="igst">IGST</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="igst" id='igst' value={quotationRequest.quotationRes.igst} />:<input className="form-control" type="number" name="igst" id='igst' onChange={handleChange} />}
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label class="col-sm-9 col-form-label" htmlFor="total-tax">Total Tax</label>
                        <div class="col-sm-3">
                            {quotationRequest.quotationRes?<input className="form-control" type="number" name="total" id='total-tax' value={quotationRequest.quotationRes.total} />:<input className="form-control" type="number" name="total" id='total-tax' onChange={handleChange} />}
                        </div>
                    </div>

                    <div className='form-group d-flex justify-content-between row mb-2'>
                        <div className='col-sm-2'><button className='btn btn-danger container-fluid' onClick={() => navigate('/quotation')}>Cancel</button></div>
                        {!quotationRequest.quotationRes&&<div className='col-sm-2'><button className='btn btn-dark container-fluid' onClick={handleSubmit} type='submit'>Send</button></div>}
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default RequestView

