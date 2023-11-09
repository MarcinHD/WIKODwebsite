import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableOrderPositions from './partials/orders/TableOrderPositions';
import SelectMenu from './partials/orders/SelectMenu';
import {SentOrder, Order, order0, userdata0} from './partials/orders/Order';
import TableApprovedOrders from './partials/orders/TableApprovedOrders';

function Orders(){
  
  // <== REACT STATE ==> 
  const [orderTable, setOrderTable] = React.useState(order0.data);
  const [approvedOrders, setApprovedOrders] = React.useState([]);

  // <== CALLBACK FUNCTIONS ==> 
  function handleAddPosition(newPos){
      setOrderTable([...orderTable,newPos]);
    };

   function handleDeletePosition(rowIndex){
      setOrderTable((prevList) =>
        prevList.filter((item, index) => index !== rowIndex)
      );
    };

  function handleApproveOrder(){
    approvedOrders.push(Order(order0.deliveryDate, ...orderTable));
    setApprovedOrders(approvedOrders);
    setOrderTable([]);
    };

    function handleSentOrder(i){
      console.log(userdata0.destination);
      console.log(userdata0.destination[0]);
      console.log(userdata0.destination.at(1));
      const prepareOrder = SentOrder(userdata0.userInfo, userdata0.destination.at(0), approvedOrders[i]);
      console.log("Sent\nThis is our data", JSON.stringify(prepareOrder));
        fetch("http://localhost:5000/testSave", 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(prepareOrder),
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
      setOrderTable(approvedOrders[i].data);
      setApprovedOrders((arr) => 
      arr.filter((item,index) => index !== i));
    }
    function handleDeleteOrder(i){
      console.log("Delete\nThis is our data", JSON.stringify(approvedOrders[i]));
      setApprovedOrders((arr) => 
      arr.filter((item,index) => index !== i));
    }
    function handleDeliveryDateChange(i, date){
      approvedOrders[i].deliveryDate=date;
      console.log("Change deliveryDate\n" + JSON.stringify(approvedOrders[i]));
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

            <SelectMenu tableData={orderTable} onAdd={handleAddPosition} />
            <TableOrderPositions tableData={orderTable} onDeleteItem={handleDeletePosition} onApprove={handleApproveOrder}/>
            <TableApprovedOrders 
            tableData={orderTable} 
            approvedOrders={approvedOrders} 
            onSent={handleSentOrder} 
            onEdit={handleEditOrder} 
            onDelete={handleDeleteOrder}
            onDeliveryDate={handleDeliveryDateChange}
            />

            </Stack>
           </Paper>
       </Grid>
       </React.Fragment>
    );
}

export default Orders;