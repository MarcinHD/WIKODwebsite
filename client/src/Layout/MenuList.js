import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { List, Divider } from '@mui/material';

function MenuList(){
    return(
        <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
        <Divider sx={{ my: 1 }} />
        {logout}
      </List>
    );
}
export default MenuList;

const mainListItems = (
    <React.Fragment>
      <ListItemButton href="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Strona główna" />
      </ListItemButton>
      <ListItemButton href="/dashboard-orders">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Zamówienia" />
      </ListItemButton>
      <ListItemButton href="/dashboard-discounts">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Promocje" />
      </ListItemButton>
      <ListItemButton href="/dashboard-products">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Asortyment" />
      </ListItemButton>
    </React.Fragment>
  );
const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Historia zamówień
      </ListSubheader>
      <ListItemButton href="/dashboard-history-last-month">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Ostatni miesiąc" />
      </ListItemButton>
      <ListItemButton href="/dashboard-history-ytd">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Od początku roku" />
      </ListItemButton>
      <ListItemButton href="/dashboard-history-all">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Cała historia" />
      </ListItemButton>
    </React.Fragment>
  );
const logout = (
    <React.Fragment>
      <ListItemButton href="/logout">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Wyloguj" />
      </ListItemButton>
    </React.Fragment>
  );