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
import { useFindPath } from '../Hooks/FindPath';

function MenuList(){
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const path = useFindPath();
  
  React.useEffect(() => {
    if(path=="/dashboard"){
    setSelectedIndex(0);
  };
  });


    return(
        <List component="nav">

            <React.Fragment>
              <ListItemButton 
              href="/dashboard" 
              selected={selectedIndex === 0}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Strona główna" />
              </ListItemButton>
              <ListItemButton 
              href="/dashboard-orders" 
              selected={selectedIndex === 1}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Zamówienia" />
              </ListItemButton>
              <ListItemButton 
              href="/dashboard-discounts" 
              selected={selectedIndex === 2}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Promocje" />
              </ListItemButton>
              <ListItemButton 
              href="/dashboard-products" 
              selected={selectedIndex === 3}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Asortyment" />
              </ListItemButton>
            </React.Fragment>

        <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader component="div" inset>
                Historia zamówień
              </ListSubheader>
              <ListItemButton 
              href="/dashboard-history-last-month" 
              selected={selectedIndex === 4}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Ostatni miesiąc" />
              </ListItemButton>
              <ListItemButton 
              href="/dashboard-history-ytd" 
              selected={selectedIndex === 5}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Od początku roku" />
              </ListItemButton>
              <ListItemButton 
              href="/dashboard-history-all" 
              selected={selectedIndex === 6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Cała historia" />
              </ListItemButton>
            </React.Fragment>
        <Divider sx={{ my: 1 }} />
          <React.Fragment>
            <ListItemButton href="/logout">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </ListItemButton>
          </React.Fragment>
      </List>
    );
}
export default MenuList;
