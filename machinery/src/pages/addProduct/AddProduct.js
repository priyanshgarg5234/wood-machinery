import React, { useState } from 'react'
import './AddProduct.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import categories from '../../assets/productCategories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.userLogin);

  let [newProduct, setNewProduct] = useState({
    sellerEmail: currentUser.email,
    name: "",
    brand: "",
    category: "",
    discription: "",
    specification: "",
    price: ""
  })
  let [image, setImage] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value })
  }
  function handleImage(event) {
    setImage(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append('image', image)
      formData.append('data', JSON.stringify({ currentUser, newProduct }))
      let res = await axios.post("http://localhost:4000/product-api/product", formData);
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate('/products');
        }
      })
    }
    catch (error) {
      toast.success("Unable to add new product", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate('/products');
        }
      })
    }
  }
  function handelCancel() {
    navigate('/products')
  }



  return (

    <div className='my-4'>
      <h2 className="text-center display-6 mb-3 ">Add Machine</h2>
      <form className='form card container  p-4' id='addProduct-form' onSubmit={handleSubmit}>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-name">Product Name:</label>
          <div class="col-sm-8">
            <input className="form-control" type="text" name="name" id="machine-name" placeholder="Add Product Name" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-brand">Brand Name:</label>
          <div class="col-sm-8">
            <input className="form-control" type="text" name="brand" id="machine-brand" placeholder="Add Product Brand" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-category">Category:</label>
          <div class="col-sm-8">
            <select className="form-control" name="category" id="machine-category" onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-price">Price:</label>
          <div class="col-sm-8">
            <input className="form-control" type="text" name="price" id="machine-price" placeholder="Enter Price" onChange={handleChange} />
          </div>
        </div>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-discription">Discription:</label>
          <div class="col-sm-8">
            <textarea type="text" className="form-control" name="discription" id="machine-discription" placeholder="Add Product Description" rows={3} cols={24} onChange={handleChange} />
          </div>
        </div>
        <div class="form-group row mb-2">
          <label class="col-sm-4 col-form-label" htmlFor="machine-spacification">Spacification:</label>
          <div class="col-sm-8">
            <textarea type="text" className="form-control" name="specification" id="machine-spacification" placeholder="Add Product Specification" rows={3} cols={24} onChange={handleChange} />
          </div>
        </div>
        <div class="form-group row mb-4">
          <label class="col-sm-4 col-form-label" htmlFor="machine-image">Upload Image:</label>
          <div class="col-sm-8">
            <input className="form-control" type="file" name="image" id="machine-image" onChange={handleImage} />
          </div>
        </div>
        <div class="form-group row mb-2 d-flex justify-content-around">
          <div class="btn btn-danger col-sm-2" onClick={handelCancel}>Cancel</div>
          <button class="btn btn-light btn-outline-dark col-sm-2" type="submit">Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>

  )
}

export default AddProduct;


