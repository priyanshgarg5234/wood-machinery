import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Quotation.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";

function Quotation() {

  const { currentUser } = useSelector(state => state.userLogin);
  const navigate = useNavigate();
  let [err, setErr] = useState('')
  const [allQuotationRequests, setAllQuotationRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:4000/quotation-api/fetchQuotationRequests/${currentUser.email}`);
        if (res.data.payload.length === 0) {
          setErr("There is no Quotation request for any product")
        }
        else {
          setAllQuotationRequests(res.data.payload);
        }
      } catch (error) {
        setErr(error.message)
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container mt-3 quotations'>
      <div className="quotation-heading">
        <h3 className='text-center lead fs-1'>Quotation Requests</h3>
      </div>
      <div className="filterQuotation mr-2">
        <div className="btn btn-success">Quotation Send</div>
        <div className="btn btn-success">Quoatation Not Send</div>
        <div className="btn btn-success">All</div>
      </div>
      <div className="table-responsive">
        <table className='mt-2 table table-bordered table-striped table-hover requests-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Company Name</th>
              <th>Coustomer Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          {err !== '' ?
            <tbody>
              <tr>
                <td colSpan={7} style={{ color: "red", fontSize: "2em" }}>{err}</td>
              </tr>
            </tbody> :
            <tbody>
              {allQuotationRequests.map((quotationRequest, index) => (
                <tr key={quotationRequest.id}>
                  <td>{index + 1}</td>
                  <td>{quotationRequest.quotationReq.productInfo.name}</td>
                  <td>
                    <img src={quotationRequest.quotationReq.productInfo.image} width={"60px"} height={"60px"} alt="Product" />
                  </td>
                  <td>{quotationRequest.quotationReq.productInfo.price}</td>
                  <td>{quotationRequest.quotationReq.userInfo.companyName}</td>
                  <td>{quotationRequest.quotationReq.userInfo.name}</td>
                  <td>{quotationRequest.quotationReq.userInfo.address.country}</td>
                  <td >
                    {quotationRequest.quotationRes ? <div className='d-flex justify-content-around'>
                      <div onClick={() => {navigate('/requestView', { state: quotationRequest })}}>
                        <IoEye size={25} />
                      </div>
                    </div>:
                      <div className="btn btn-danger" onClick={() => {navigate('/requestView', { state: quotationRequest })}}>
                        Send
                      </div>}
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Quotation
