import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Badge, IconButton, Divider } from "@mui/material";
import Switch from '@mui/material/Switch';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function Settings(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [themeDay, setThemeDay] = React.useState(true);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const handleThemeClick = () => {
        setThemeDay(!themeDay);
        setAnchorEl(null);
    }

    return (
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
        <MenuItem onClick={handleClose} disableRipple>
        <ListItemIcon>
          <PersonIcon />
          </ListItemIcon>
          Konto
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
        <ListItemIcon>
          <AddHomeWorkIcon />
          </ListItemIcon>
          Adres dostawy
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
        <ListItemIcon>
          <AttachMoneyIcon />
          </ListItemIcon>
          Dane rozliczenia
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
    );
}
export default Settings;