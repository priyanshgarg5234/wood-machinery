import React from 'react'
import Card from "../card/Card"
import "./TopPicks.css"

function TopPicks({ products }) {
  let topProducts = products.slice(0, 8);
  return (
    <>
      <div className='top-picks'>
        <h1>Top Picks For New Machine</h1>
        <div className='top-products'>
          {/* <div className='scrollable-container'> */}
          {topProducts.map((product) => (
            <div key={product._id} className='wrapper'>
              <Card style={{ width: "250px" }}
                product={product} />
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default TopPicks