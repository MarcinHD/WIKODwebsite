import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Badge, IconButton, Divider } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsDestination from './settings/SettingsDestinantion';
import SettingsAccount from './settings/SettingsAccount';
import { UserContext } from '../../../Context/UserContext';
import { useToggleTheme } from '../../../Context/MUIThemeContext';


function Settings(){
    const {userData, setUserData} = React.useContext(UserContext);
    const [openAccount, setOpenAccount] = React.useState(false);
    const [openDestination, setOpenDestination] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [themeDay, setThemeDay] = React.useState(true);
    const [changedDestinations, setChangedDestinations] = React.useState(false);
    const [changedData, setChangedData] = React.useState(false);
    const toggleMode = useToggleTheme();
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const handleThemeClick = () => {
        setThemeDay(!themeDay);
        toggleMode();
        setAnchorEl(null);
    }
    function updateDatabaseDestination(){
      if(changedDestinations){
      console.log("Add Destinantion PUT\nThese are user.destinations", JSON.stringify(userData.destinations));
      fetch(`${process.env.REACT_APP_DB_PUT_USER_DESTINATION_URL}`, 
      {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({destinations: [...userData.destinations]}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setChangedDestinations(false);
        })
      .catch((error) => {
        console.error('Error:', error);
        })
      }
    }
    function updateDatabaseUser(){
      if(changedData){
      console.log("User Data PUT\nThis is user.user", JSON.stringify(userData.user));
      fetch(`${process.env.REACT_APP_DB_PUT_USERDATA_URL}`, 
      {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({data: {...userData.user}}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setChangedData(false);
        })
      .catch((error) => {
        console.error('Error:', error);
        })
      }
    }

    return (
      <React.Fragment>

        <IconButton color="inherit">
        <Badge color="secondary" onClick={handleClick}>
            <SettingsIcon />
        </Badge>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
        <MenuItem onClick={()=> setOpenAccount(true)} disableRipple>
        <ListItemIcon>
          <PersonIcon />
          </ListItemIcon>
          Konto
        </MenuItem>
        <MenuItem onClick={()=> setOpenDestination(true)} disableRipple>
        <ListItemIcon>
          <AddHomeWorkIcon />
          </ListItemIcon>
          Adres dostawy
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleThemeClick} disableRipple>
        <ListItemIcon>
        {themeDay===true ? (<DarkModeIcon />):(<LightModeIcon />)}        
          </ListItemIcon>
          Tryb
        </MenuItem>
        </Menu>
  </IconButton>
          
  <SettingsDestination
        open={openDestination}
        setChangedDestinations={setChangedDestinations}
        onClose={()=> {
          setOpenDestination(false);
          updateDatabaseDestination();
          }}
      />
    <SettingsAccount 
        open={openAccount}
        setChangedData={setChangedData}
        onClose={()=> {
          setOpenAccount(false);
          updateDatabaseUser();
          }}
    />

  </React.Fragment>
    );
}
export default Settings;