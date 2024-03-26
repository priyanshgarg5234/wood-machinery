import React from 'react'
import "./report.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

function Report() {
    const navigate = useNavigate()
    const location = useLocation();
    const report = location.state;
    let totalPrice
    if (report.quotationRes !== undefined) {
        totalPrice = parseInt(report.quotationRes.rate) + parseInt(report.quotationRes.insurance) + parseInt(report.quotationRes.freightCharges);
    }
    const { toPDF, targetRef } = usePDF({ filename: 'report.pdf' });

    return (
        <div className='container p-3'>
            <div ref={targetRef}>
                <div className="card p-2 report-pdf">
                    <div className='row'>
                        <div className="col-sm-5 text-center report-product-img">
                            <img src={report.quotationReq.productInfo.image} width={"200"} height={"200px"} alt="No img" />
                        </div>
                        <div className="col-sm-5 table-responsive report-product-info">
                            <table className='table table-borderless'>
                                <thead>
                                    <tr>
                                        <th>Product Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='row-sm'>
                                        <td className='col-sm-5 label'>Product </td>
                                        <td className="col report-product-name">{report.quotationReq.productInfo.name}</td>
                                    </tr>
                                    <tr className='row-sm'>
                                        <td className='col-sm-5 label'>Brand </td>
                                        <td className="col report-product-brand">{report.quotationReq.productInfo.brand}</td>
                                    </tr>
                                    <tr className='row-sm'>
                                        <td className='col-sm-5 label'>Category </td>
                                        <td className="col report-product-category">{report.quotationReq.productInfo.category}</td>
                                    </tr>
                                    <tr className='row-sm'>
                                        <td className='col-sm-5 label'>Price </td>
                                        <td className="col report-product-category">${report.quotationReq.productInfo.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="table-responsive m-2 p-2 report-final-quotation">
                        <table className='table table-borderless table-striped report-table'>
                            <tbody>
                                <tr className='row' style={{ backgroundColor: "lightgrey" }}>
                                    <td className='col label'>Cost</td>
                                    <td className="col final-price">{report.quotationRes !== undefined && report.quotationRes.rate}</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col label'>Insurance Charges </td>
                                    <td className="col final-insurance">{report.quotationRes !== undefined && report.quotationRes.insurance}</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col label'>Freight Charges </td>
                                    <td className="col final-freightCharges">{report.quotationRes !== undefined && report.quotationRes.freightCharges}</td>
                                </tr>
                                <tr className='row' style={{ backgroundColor: "lightgrey" }}>
                                    <td className='col label'>Total Price </td>
                                    <td className='col final-total'>{report.quotationRes !== undefined && totalPrice}</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col label'>Basic Custom Duty% </td>
                                    <td className="col final-basic">{report.quotationRes !== undefined && report.quotationRes.basic + "%"}</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col label'>Integrated GST% </td>
                                    <td className="col final-igst">{report.quotationRes !== undefined && report.quotationRes.igst + "%"}</td>
                                </tr>
                                <tr className='row'>
                                    <td className='col label'>Total Duty% </td>
                                    <td className="col final-total">{report.quotationRes !== undefined && report.quotationRes.total + "%"}</td>
                                </tr>
                                <tr className='row' style={{ backgroundColor: "lightgrey" }}>
                                    <td className='col label'>Billable Amount</td>
                                    <td className="col final-bill">{report.quotationRes !== undefined && "$" + (totalPrice + parseInt(report.quotationRes.basic) * totalPrice * 0.01 + parseInt(report.quotationRes.igst) * totalPrice * 0.01 + parseFloat(report.quotationRes.total) * totalPrice * 0.01)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="report-close  text-center exclude-from-pdf">
                        <button className="btn btn-danger" onClick={() => navigate(-1)}>Close</button>
                        <div className='text-right mt-3'><button className="btn btn-danger" onClick={() => toPDF()}>Download PDF</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report