import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TopPicks from "../../components/topPicks/TopPicks"
import axios from "axios";
import "./Home.css"
import AboutUs from "../../components/aboutus/AboutUs";

function Home() {

  const [allProducts, setAllProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  let topProducts = allProducts.slice(0, 5);

  function handleChange(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/product-api/products');
      let productList = response.data.payload
      setAllProducts(productList.map((item) => item.products).flat())

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const viewProductDetails = (productId) => {
    // Logic to open the product details page for the selected product
  };

  return (
    <div className="home">
      <div className="carousel-container">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          selectedItem={topProducts[currentIndex]}
          onChange={handleChange}
          className="carousel-container"
        >
          {topProducts.map((product) => (
            <div key={product._id} className="slide">
              <img className="carouseImg"
                src={product.image}
                alt={`Product ${product._id}`}
                onClick={() => viewProductDetails(product._id)}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="toppicks-container">
        <TopPicks products={allProducts} />
      </div>
      <div className="about-us">
        <AboutUs />
      </div>
    </div>

  )
}

export default Home