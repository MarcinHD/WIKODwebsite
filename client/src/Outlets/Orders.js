import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableOrderPositions from './partials/orders/TableOrderPositions';
import SelectMenu from './partials/orders/SelectMenu';
import {SentOrder, Order, order0, userdata0} from './partials/orders/Order';
import TableApprovedOrders from './partials/orders/TableApprovedOrders';
import { nextDate, formatDate } from './partials/orders/Date';

function Orders(){
  // example data
  const testPositions = order0.data;
  // TODO: dodac import danych uzytkownika z DB i uzywac z useContext
  var userDataset = userdata0;
  var userChosenDestination = userDataset.destination.at(0);
  
  // <== REACT HOOKS ==> 
  const [newOrder, setNewOrder] = React.useState(testPositions);
  const [approvedOrders, setApprovedOrders] = React.useState(null);

  // <== HANDLE FUNCTIONS ==> 
  function handleAddPosition(newPos){
      setNewOrder([...newOrder,newPos]);
    };

   function handleDeletePosition(rowIndex){
      setNewOrder((prevList) =>
        prevList.filter((i, index) => index !== rowIndex)
      );
    };

  function handleApproveOrder(){
    approvedOrders.push(Order(formatDate(nextDate()), ...newOrder));
    setApprovedOrders(approvedOrders);
    setNewOrder([]);
    };

    function handleSentOrder(i){
      const prepareOrder = SentOrder(userDataset.userInfo, userChosenDestination, approvedOrders[i]);
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
      setNewOrder(approvedOrders[i].data);
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
    function handleDestinationChange(destinationIndex){
      userChosenDestination=userDataset.destination[destinationIndex];
      console.log("Change destination\n" + JSON.stringify(userChosenDestination));
    }

    // <== COMPONENT ==> 
    return (
        <React.Fragment>
        <Typography component="h2" variant="h3" color="primary" gutterBottom sx={{ p: 3 }}>
              Dodaj zamówienie
        </Typography> 

       <Grid item xs={12}>
           <Paper sx={{p: 3, display: 'flex', flexDirection: 'row', minWidth: 1000}}>
            <Stack spacing={4}>       
            <SelectMenu onAdd={handleAddPosition} />
            {newOrder && 
            <TableOrderPositions 
                tableData={newOrder} 
                onDeleteItem={handleDeletePosition} 
                onApprove={handleApproveOrder}
            />}
            {newOrder && approvedOrders && <Divider/>}
            {approvedOrders &&
            <TableApprovedOrders 
                approvedOrders={approvedOrders} 
                userData={userdata0}
                onSent={handleSentOrder} 
                onEdit={handleEditOrder} 
                onDelete={handleDeleteOrder}
                onDeliveryDate={handleDeliveryDateChange}
                onDestination={handleDestinationChange}
            />}
            </Stack>
           </Paper>
       </Grid>
       </React.Fragment>
    );
}

export default Orders;