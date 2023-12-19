import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { UserContext } from '../../../../Context/UserContext';
import { Destination } from '../../orders/Order';


function SettingsDestination(props){
    const {userData, setUserData} = React.useContext(UserContext);
    const [addNew, setAddNew] = React.useState(false);
    const [newDestination, setNewDestination] = React.useState(Destination("","","",""));
    const [openSnackbar, setOpenSnackbar] = React.useState([false,0]);
    const { onClose, setChangedDestinations, open} = props;
    const deleteButtonWidth = 80;

        // <== SNACKBAR ==>
    const snack = {severity: ['success','error'], text: ['Dodano nowy sklep !','Usunięto sklep !']};
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function handleClose(){
      onClose();
      setAddNew(false);
    }

    function handleChange(event){
      if(event.target.id==="place"){
        setNewDestination({
          ...newDestination,
          [event.target.id]: event.target.value,
        })
      }else{
        setNewDestination({
          ...newDestination,
          address:{
            ...newDestination.address,
            [event.target.id]: event.target.value,
          }
        })}
      };

    function handleAddDestination(){
      setUserData({
        username: userData.username,
        user: userData.user,
        destinations:[...userData.destinations, newDestination],
      });
      setChangedDestinations(true);
      setAddNew(false);
      setOpenSnackbar([true,0]);
    }
    function handleDelete(i){
      setUserData({
        username: userData.username,
        user: userData.user,
        destinations:[...userData.destinations.filter((item,index) => index !== i)],
      });
      setChangedDestinations(true);
      setOpenSnackbar([true,1]);
    }
    function handleCloseSnackbar(event, reason){
      if (reason === 'clickaway') return;
      setOpenSnackbar([false,0]);
    }

    return(
        <React.Fragment>
        {userData && <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'xs'}>
        <DialogTitle>Twoje adresy dostawy:</DialogTitle>
        <List sx={{ pt: 0 }}>
          {userData.destinations.map((item,index) => (
            <ListItem disableGutters key={item.place}>
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.place} secondary={item.address.city + ", " + item.address.street + " " + item.address.number} />
              </ListItemButton>
              <ListItemButton sx={{maxWidth:deleteButtonWidth}}>
              <DeleteIcon onClick={()=> handleDelete(index)}  />
              </ListItemButton>
            </ListItem>
          ))}
          {!addNew && <ListItem disableGutters>
            <ListItemButton
                onClick={()=> setAddNew(true)}
              autoFocus
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dodaj adres" />
            </ListItemButton>
          </ListItem>}
        </List>
        {addNew && <DialogContent>
        <TextField onChange={handleChange} autoFocus margin="dense" id="place" label="Nazwa sklepu" fullWidth variant="standard"/>
        <TextField onChange={handleChange} margin="dense" style = {{width: 240}} id="city" label="Miejscowość" variant="standard"/>
        <TextField onChange={handleChange} margin="dense" style = {{width: 240}} id="street" label="Ulica" variant="standard"/>
        <TextField onChange={handleChange} margin="dense" style = {{width: 100}} id="number" label="Numer" variant="standard"/>
        <Divider sx={{p:2,m:2}} />
        <Button variant="contained" onClick={handleAddDestination}>Dodaj</Button>
        </DialogContent>}
      <Snackbar sx={{minWidth: 700}} open={openSnackbar[0]} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snack.severity[openSnackbar[1]]} sx={{ width: '100%' }}>
                {snack.text[openSnackbar[1]]}
              </Alert>
        </Snackbar>
        </Dialog>}
      </React.Fragment>
    );
}
export default SettingsDestination;