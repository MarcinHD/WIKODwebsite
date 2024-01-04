import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableOrderPositions from './partials/orders/TableOrderPositions';
import SelectMenu from './partials/orders/SelectMenu';
import {SentOrder, Order, order0} from './partials/orders/Order';
import TableApprovedOrders from './partials/orders/TableApprovedOrders';
import { nextDate, formatDate } from './partials/orders/Date';
import { UserContext } from '../Context/UserContext';
import { HistoryContext } from '../Context/HistoryContext';

function Orders(){
  // EXAMPLE DATA
  const testPositions = order0.data;  
  
  // <== REACT HOOKS ==> 
  const {userData, setUserData} = React.useContext(UserContext);
  const {history, setHistory} = React.useContext(HistoryContext);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [newOrder, setNewOrder] = React.useState(testPositions);
  const [approvedOrders, setApprovedOrders] = React.useState([]);

  // <== CHECK IF DATA EXIST ==> 
  if(!userData) return <h1>No connection to DBs</h1>
  var userChosenDestination = userData.destinations[0];

  // <== SNACKBAR ==>
  const snack = {severity: ['success','error'], text: ['Zamówienie zostało wysłane !', 'Wystąpił bład podczas wysyłania ...']};
  var snackStatus = 0;
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
    setApprovedOrders([
      ...approvedOrders, 
      Order(formatDate(nextDate()), userChosenDestination, ...newOrder)
    ]);
    setNewOrder([]);
    };

    function handleSentOrder(i){
      const prepareOrder = SentOrder(userData.user, approvedOrders[i]);
      console.log("Sent\nThis is our data", JSON.stringify(prepareOrder));
        fetch(`${process.env.REACT_APP_DB_POST_SAVE_ORDER_URL}`, 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(prepareOrder),
          })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setApprovedOrders((arr) => 
          arr.filter((item,index) => index !== i));
          setHistory([...history,prepareOrder]);
          showSnackbar(true);
        })
        .catch((error) => {
          console.error('Error:', error);
          showSnackbar(false);
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
    function handleDestinationChange(i, destinationIndex){
      userChosenDestination=userData.destinations[destinationIndex];
      approvedOrders[i].deliveryDestination=userChosenDestination;
      console.log("Change destination\n" + JSON.stringify(userChosenDestination));
    }

    function showSnackbar(status){
      snackStatus = status ? 0 : 1;
      setOpenSnackbar(true);
    }
    function handleCloseSnackbar(event, reason){
      if (reason === 'clickaway') return;
      setOpenSnackbar(false);
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
                onSent={handleSentOrder} 
                onEdit={handleEditOrder} 
                onDelete={handleDeleteOrder}
                onDeliveryDate={handleDeliveryDateChange}
                onDestination={handleDestinationChange}
            />}
            </Stack>
           </Paper>
       </Grid>
       <Snackbar sx={{minWidth: 700}} open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snack.severity[snackStatus]} sx={{ width: '100%' }}>
                {snack.text[snackStatus]}
              </Alert>
        </Snackbar>
       </React.Fragment>
    );
}

export default Orders;