import * as React from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import TestInfiniteScroll from './testInfinteScroll';
import { ProductsContext } from '../Context/ProductsContextFile';


function Products(){
    const products = React.useContext(ProductsContext);

    if(!products) return <h1>No connection to DBs</h1>

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
            {products.length>0 ? <DataGrid rows={products} columns={columns}/> :  <LinearProgress />}
            </div>
        </div>
    );
}

export default Products;


