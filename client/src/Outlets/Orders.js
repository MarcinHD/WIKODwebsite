import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableOrderPositions from './partials/orders/TableOrderPositions';
import SelectMenu from './partials/orders/SelectMenu';
import {Order, order0} from './partials/orders/Order';
import TableApprovedOrders from './partials/orders/TableApprovedOrders';

function Orders(){
  
  // <== REACT STATE ==> 
  const [tableData, setTableData] = React.useState(order0.data);
  const [approvedOrders, setApprovedOrders] = React.useState([]);

  // <== CALLBACK FUNCTIONS ==> 
  function handleAddPosition(newItem){
      setTableData([...tableData,newItem]);
    };

   function handleDeletePosition(rowIndex){
      setTableData((prevList) =>
        prevList.filter((item, index) => index !== rowIndex)
      );
    };

  function handleApproveOrder(){
    approvedOrders.push(Order(...tableData));
    setApprovedOrders(approvedOrders);
    setTableData([]);
    };

    function handleSentOrder(i){
      console.log("Sent\nThis is our data", JSON.stringify(approvedOrders[i]));
        fetch("http://localhost:5000/testSave", 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(approvedOrders[i]),
          })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setApprovedOrders((arr) => 
          arr.filter((item,index) => index !== i))
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    function handleEditOrder(i){
      console.log("Edit\nThis is our data", JSON.stringify(approvedOrders[i]));
      console.log(approvedOrders[i].data);
      setTableData(approvedOrders[i].data);
      setApprovedOrders((arr) => 
      arr.filter((item,index) => index !== i));
    }
    function handleDeleteOrder(i){
      console.log("Delete\nThis is our data", JSON.stringify(approvedOrders[i]));
      setApprovedOrders((arr) => 
      arr.filter((item,index) => index !== i));
    }

    // <== REACT PAGE ==> 
    return (
        <React.Fragment>
        <Typography component="h2" variant="h3" color="primary" gutterBottom sx={{ p: 3 }}>
              Dodaj zamówienie
        </Typography> 

       <Grid item xs={12}>
           <Paper sx={{p: 3, display: 'flex', flexDirection: 'row', minWidth: 1000}}>
            <Stack spacing={4}>       

            <SelectMenu tableData={tableData} onAdd={handleAddPosition} />
            <TableOrderPositions tableData={tableData} onDeleteItem={handleDeletePosition} onApprove={handleApproveOrder}/>
            <TableApprovedOrders 
            tableData={tableData} 
            approvedOrders={approvedOrders} 
            onSent={handleSentOrder} 
            onEdit={handleEditOrder} 
            onDelete={handleDeleteOrder}/>

            </Stack>
           </Paper>
       </Grid>
       </React.Fragment>
    );
}

export default Orders;