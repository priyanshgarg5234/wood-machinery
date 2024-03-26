import React, { useEffect, useState } from 'react'
import "./Products.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";

function Products() {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.userLogin);
  let [products, setProducts] = useState([])
  let [error, setError] = useState('');

  useEffect(() => {
    displayProducts();
  }, [])

  async function displayProducts() {
    try {
      let res = await axios.get(`http://localhost:4000/product-api/products/${currentUser.email}`)
      let productList
      if (res.data === "no product is available") {
        productList = []
      }
      else {
        productList = res.data
      }
      if (productList.length === 0) {
        setError("No Product Is Avaialable")
      }
      else {
        setProducts(productList)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  function handleAddProduct() {
    navigate('/addProduct')
  }

  async function handleDeleteProduct(productId) {
    let res = await axios.delete(`http://localhost:4000/product-api/product/${productId}/${currentUser.email}`)
    displayProducts()
  }

  return (
    <>
      <div className='container mt-3 '>
        <div >
          <h3 className='text-center lead fs-1' >Products</h3>
          <div className='d-flex justify-content-end'><button className='btn btn-danger' onClick={handleAddProduct}>Add Product</button></div>
        </div>
        <div className='table-responsive'>
          <table className='mt-2 table table-responsive table-bordered table-striped table-hover product-table '>
            <thead >
              <tr style={{ backgroundColor: '#14143c', color: 'white' }}>
                <th>S.no</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            {error !== '' ?
              <tbody>
                <tr>
                  <td colSpan={7} style={{ color: "red", fontSize: "2em", textAlign: "center" }}>{error}</td>
                </tr>
              </tbody> :
              <tbody>
                {/* Render each product row */}
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td><img src={product.image} al width={"60px"} height={"60px"} /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td >{product.discription}</td>
                    <td><div className="text-center" onClick={() => handleDeleteProduct(product._id)}><MdDelete size={25} /></div></td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default Products;
