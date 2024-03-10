import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <h1 className='title'>Fake Store</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product" onClick={() => showProductDetails(product)}>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <button onClick={closeProductDetails} className='close-button'>Close</button>
          <h2>{selectedProduct.title}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
        </div>
      )}

      
    </div>
  );
}

export default App;
