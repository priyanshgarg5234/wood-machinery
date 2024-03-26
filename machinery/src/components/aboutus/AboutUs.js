import React from 'react'
import './AboutUs.css'
import about from '../../assets/about.jpg'

function AboutUs() {
  return (
    <div className="mt-3 mb-3" style={{ padding: "20px", backgroundColor: "black", color: "white" }}>
      <div className="container" >
        <div className="row">
          <div className="col-md-6">
            <img src={about} alt="Company Image" className="img-fluid w-100 h-100" />
          </div>
          <div className="col-md-6">
            <h2>About Our Company</h2>
            <p>
              Welcome to our e-commerce platform for buying and selling wood machinery. At our company, we strive to provide a seamless experience for both sellers and buyers in the wood machinery industry.
            </p>
            <p>
              With our platform, sellers can easily list their wood machinery products, reach a wide audience, and manage their inventory efficiently. On the other hand, buyers can explore a variety of wood machinery options, compare prices, and make informed purchasing decisions.
            </p>
            <p>
              We understand the importance of quality, reliability, and customer satisfaction. Our team is dedicated to ensuring a secure and user-friendly environment for all our users. Whether you are a seller or a buyer, we are here to support your wood machinery needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs