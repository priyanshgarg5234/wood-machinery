import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./QuotationReport.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function QuotationReport() {
    let navigate = useNavigate()
    let [quotationReports, setQuotationReports] = useState([])
    const { currentUser } = useSelector(state => state.userLogin);

    useEffect(() => {
        async function getQuotationReports() {
            let res = await axios.get(`http://localhost:4000/quotation-api/quotations/${currentUser.email}`)
            setQuotationReports(res.data)
        }
        getQuotationReports();
    }, [])


    return (
        <div className='container quotation-reports'>
            <h1 className='text-center my-4 quotation-reports-heading'>View Quotation</h1>
            {quotationReports.length !== 0 ?
                <table className="table table-responsive table-bordered table-striped table-hover quotation-reports-list mb-5">
                    <tbody>
                        {
                            quotationReports.map((report) => (
                                <tr key={report._id} className=" row report-wraper">
                                    <td className="col text-center report-pimage"><img src={report.quotationReq.productInfo.image} width="80px" height="80px" alt='no image' /></td>
                                    <td className="col  d-flex align-items-center justify-content-center report-pname"><p>{report.quotationReq.productInfo.name}</p></td>
                                    <td className="col d-flex align-items-center justify-content-center report-puse"><p>{report.quotationReq.productInfo.category}</p></td>
                                    <td className="col d-flex align-items-center justify-content-center  action-button">{report.quotationRes !== undefined ? <button className="btn btn-dark" onClick={() => navigate('/report', { state: report })}>View</button> : "Response not recieved"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table> :
                <div className='quotation-report-status'>
                    <p>No quotation is available</p>
                </div>}


        </div>
    )
}

export default QuotationReport
