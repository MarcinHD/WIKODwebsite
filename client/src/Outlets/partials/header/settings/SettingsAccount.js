import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Divider } from "@mui/material";
import { UserContext } from "../../../../Context/UserContext";

function SettingsAccount(props){
    const {userData, setUserData} = React.useContext(UserContext);
    const { onClose, setChangedData, open} = props;

    return(
        <React.Fragment>
        {userData && <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={'xs'}>
        <DialogTitle>
        Twoje konto:
        </DialogTitle>
        <DialogContent>
            <AccountList setChangedData={setChangedData}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>}
      </React.Fragment>
    );
}
export default SettingsAccount;

function AccountList(props){
  const { setChangedData } = props;
  const {userData, setUserData} = React.useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [edit, setEdit] = React.useState([false,false,false,false]);
  const [values, setValues] = React.useState({
    firstName: userData.user.firstName,
    lastName: userData.user.lastName,
    phone: userData.user.phone,
    payment: userData.user.payment,
});
  const editButtonWidth=40;

    // <== SNACKBAR ==>
  const snack = {severity: 'success', text: 'Zmieniono dane !'};
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleEdit(event){
    var temp = [...edit];
    console.log("ID: " + event.currentTarget.id);
    console.log("temp[id]: " + temp[event.currentTarget.id])
    if(temp[event.currentTarget.id]){
      setUserData({
        username: userData.username,
        user: {...values},
        destinations:[...userData.destinations],
      });
      setChangedData(true);
      setOpenSnackbar(true);
    }
    temp[event.currentTarget.id]=!temp[event.currentTarget.id];
    setEdit(temp);
  }
  function handleCloseSnackbar(event, reason){
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  }

  return (
    <React.Fragment>
       <ListItem disableGutters key={"FirstName"}>
          <ListItemText primary={"Imie: "} secondary={!edit[0] ? values.firstName : "\u2008"} />
          {edit[0] && <TextField value={values.firstName} onChange={(event)=>setValues({...values, firstName: event.target.value})} variant="outlined" />}
          <ListItemButton id="0" onClick={handleEdit} sx={{maxWidth:editButtonWidth}}>
           {!edit[0] ? <EditIcon  /> : <DoneIcon/> }
          </ListItemButton>
      </ListItem>
    <Divider/>
    <ListItem disableGutters key={"LastName"}>
          <ListItemText primary={"Nazwisko: "} secondary={!edit[1] ? values.lastName : "\u2008"} />
          {edit[1] && <TextField value={values.lastName} onChange={(event)=>setValues({...values, lastName: event.target.value})} variant="outlined" />}
          <ListItemButton id="1" onClick={handleEdit} sx={{maxWidth:editButtonWidth}}>
           {!edit[1] ? <EditIcon  /> : <DoneIcon/> }
          </ListItemButton>
      </ListItem>
    <Divider/>
    <ListItem disableGutters key={"Username"}>
          <ListItemText primary={"Nazwa użytkownika: "} secondary={userData.username} />
      </ListItem>
    <Divider/>
    <ListItem disableGutters key={"Phone"}>
          <ListItemText primary={"Numer telefonu: "} secondary={!edit[2] ? values.phone : "\u2008"} />
          {edit[2] && <TextField value={values.phone} onChange={(event)=>setValues({...values, phone: event.target.value})} variant="outlined" />}
          <ListItemButton id="2" onClick={handleEdit} sx={{maxWidth:editButtonWidth}}>
           {!edit[2] ? <EditIcon  /> : <DoneIcon/> }
          </ListItemButton>
      </ListItem>
    <Divider/>
    <ListItem disableGutters key={"Payment"}>
          <ListItemText primary={"Płatność: "} secondary={!edit[3] ? values.payment : "\u2008"} />
          {edit[3] && <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Płatność</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.payment}
                label="Płatność"
                onChange={(e,value) => setValues({...values, payment: e.target.value})}>
                <MenuItem value={"Gotówka"}>Gotówka</MenuItem>
                <MenuItem value={"Przelew"}>Przelew</MenuItem>
              </Select>
            </FormControl>}
          <ListItemButton id="3" onClick={handleEdit} sx={{maxWidth:editButtonWidth}}>
           {!edit[3] ? <EditIcon  /> : <DoneIcon/> }
          </ListItemButton>
      </ListItem>
    <Divider/>
    <Snackbar sx={{minWidth: 700}} open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snack.severity} sx={{ width: '100%' }}>
                {snack.text}
              </Alert>
        </Snackbar>
  </React.Fragment>

  )
}