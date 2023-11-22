import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableOrderPositions from './partials/orders/TableOrderPositions';
import SelectMenu from './partials/orders/SelectMenu';
import {SentOrder, Order, order0} from './partials/orders/Order';
import TableApprovedOrders from './partials/orders/TableApprovedOrders';
import { nextDate, formatDate } from './partials/orders/Date';
import { UserContext } from '../Context/UserContext';

function Orders(){
  // EXAMPLE DATA
  const testPositions = order0.data;  
  
  // <== REACT HOOKS ==> 
  const user = React.useContext(UserContext);

  const [newOrder, setNewOrder] = React.useState(testPositions);
  const [approvedOrders, setApprovedOrders] = React.useState([]);

  if(!user) return <h1>No connection to DBs</h1>
  console.log("User obj: \n" + JSON.stringify(user));
  console.log("User obj: \n" + JSON.stringify(user.destinations));
  console.log("User obj: \n" + JSON.stringify(user.destinations[0].place));
  var userChosenDestination = "";

  // <== HANDLE FUNCTIONS ==> 
  function handleAddPosition(newPos){
      setNewOrder([...newOrder,newPos]);
    };

   function handleDeletePosition(rowIndex){
      setNewOrder((list) =>
        list.filter((i, index) => index !== rowIndex)
      );
    };

  function handleApproveOrder(){
    setApprovedOrders([...approvedOrders, Order(formatDate(nextDate()), userChosenDestination, ...newOrder)]);
    setNewOrder([]);
    };

    function handleSentOrder(i){
      const prepareOrder = SentOrder(user, approvedOrders[i]);
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
      userChosenDestination=user.destinations[destinationIndex];
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
            {newOrder.length !== 0 && 
            <TableOrderPositions 
                tableData={newOrder} 
                onDeleteItem={handleDeletePosition} 
                onApprove={handleApproveOrder}
            />}
            {newOrder.length !== 0 && approvedOrders.length !== 0 && <Divider/>}
            {approvedOrders.length !== 0 &&
            <TableApprovedOrders 
                approvedOrders={approvedOrders} 
                userData={user}
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