import * as React from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import TestInfiniteScroll from './testInfinteScroll';

function Products(){

    const [products, setProducts] = React.useState(null);

    React.useEffect(() => {
      axios.get("http://localhost:5000/products")
      .then((response) => {
        console.log("Downloaded");
        console.log(response.data);
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

    const columns = [
        { field: 'id', headerName: 'Lp', type: 'number', width: 70 },
        { field: 'code', headerName: 'Kod', width: 150 },
        { field: 'name', headerName: 'Nazwa', width: 300 },
        { field: 'unit', headerName: 'Jedn.', sortable: false, width: 70 },
        { field: 'price', headerName: 'Cena', type: 'number', width: 90},
      ];
      
    return (
        <div>
            <h1>Products</h1>
            <div style={{ height: '70vh', width: '120%' }}>
            {products ? <DataGrid rows={products} columns={columns}/> :  <LinearProgress />}
            </div>
        </div>
    );
}

export default Products;


