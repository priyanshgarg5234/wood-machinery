import React from 'react'
import "./Card.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Card({ product }) {
    const { currentUser } = useSelector(state => state.userLogin);
    let navigate = useNavigate()

    function handleSendQuotationRequest() {
        if (currentUser.userType === "seller") {
            toast("Login as customer to get Product Quotation", {
                position: "top-right",
                autoClose: 2000,
            })
        } else {
            navigate("/requestQuotationForm", { state: product })
        }
    }

    return (
        <>
            <div className='card w cardContainer'>
                <div className='cardImage'>
                    <img className='card-img-top' style={{ width: "200px", height: "130px" }} src={product.image} alt='Not Found' />
                </div>
                <div className='card-body'>
                    <div className='card-title product-info'>{product.name}</div>
                    <div className="card-subtitle mb-2 text-muted product-info" >{product.discription}</div>
                    <div className="" style={{ color: "red" }}>${product.price}</div>
                    <button onClick={handleSendQuotationRequest}>Get Quotes</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Card
