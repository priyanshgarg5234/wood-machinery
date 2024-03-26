import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Category.css'
import Card from '../../components/card/Card'
import categories from '../../assets/productCategories';

function Category() {
  let [allProducts, setAllProducts] = useState([])
  let [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {

    let res = await axios.get(`http://localhost:4000/product-api/products`,)
    let productList = res.data.payload
    setAllProducts(productList.map((item) => item.products).flat())
    setFilteredProducts(productList.map((item) => item.products).flat());

  }

  function handleSelectCategory(e) {
    const selectedCategory = e.target.innerText;
    setCategory(selectedCategory);
    filterProducts(selectedCategory);
  }

  function filterProducts(selectedCategory) {
    if (selectedCategory === '') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  }



  function handleShowAllProducts() {
    setCategory('');
    setFilteredProducts(allProducts);
  }
  return (
    <div className="category">
      <div className="categoriesName-list">
        <div className="filter-heading-container">
          <div className="filter-heading">Filter</div>
          <div className='showAllProducts-button'><button onClick={handleShowAllProducts}>Clear Filter</button></div>
        </div>
        <div className="filter-types">
          <div className="filtertype-contatiner">
            <div className="filter-headingname">Category</div>
            <div className='categories-name'>
              {categories.map((category1) => (
                <div
                  key={category1.id}
                  className="category-wraper"
                  id={`${category1.name === category ? "selected-category" : ""}`}
                  onClick={handleSelectCategory}
                >
                  {category1.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className="product-list">
        {/* <div className="productList-heading">
          <select name="" id="">
            <option value="Sort">Sort</option>
            <option value="Name Ascending">Name Ascending</option>
            <option value="Name Descending">Name Descending</option>
            <option value="Name Descending">Price Ascending</option>
            <option value="Name Descending">Price Descending</option>
          </select>

        </div> */}
        <div className="productList-card">
          {filteredProducts.map((product) => (
            <div key={product._id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category



