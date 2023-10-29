import * as React from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

function Products(){

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get("http://localhost:5000/products.json")
      .then((response) => {
        console.log("Downloaded");
        setPost(response.data);
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
        { field: 'id', headerName: 'Lp', width: 70 },
        { field: 'code', headerName: 'Kod', width: 150 },
        { field: 'name', headerName: 'Nazwa', width: 300 },
        { field: 'unit', headerName: 'Jedn.', sortable: false, width: 70 },
        { field: 'price', headerName: 'Cena', type: 'number', width: 90},
      ];

      if (!post) return <h1>Cant connect to server ...</h1>;
      
    return (
        <div>
            <h1>Products</h1>
            <div style={{ height: '70vh', width: '120%' }}>
            <DataGrid
              rows={post}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 100]}
            />
          </div>
        </div>
    );
}

export default Products;


