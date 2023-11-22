import React from 'react';
import axios from "axios";

export const ProductsContext = React.createContext([]);

export const ProductsProvider = props => {
  const [products, setProducts] = React.useState(null);
  React.useEffect(() => {
      axios.get("http://localhost:5000/products")
      .then((response) => {
        console.log("Context: Downloaded products");
        setProducts(response.data);
      })
      .catch((err)=>{
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
    }, []);
    return (
      <ProductsContext.Provider value={products}>
          {props.children}
      </ProductsContext.Provider>
      );
}
