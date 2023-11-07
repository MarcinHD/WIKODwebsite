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
//   React.useEffect(() => {
//     switch (path) {
//       case "/dashboard":
//         setSelectedIndex(0);
//         break;
//       case "/dashboard-orders":
//         setSelectedIndex(1);
//         break;
//       case "/dashboard-discounts":
//         setSelectedIndex(2);
//         break;
//       case "/dashboard-products":
//         setSelectedIndex(3);
//         break;
//       case "/dashboard-history-last-month":
//         setSelectedIndex(4);
//         break;
//       case "/dashboard-history-ytd":
//         setSelectedIndex(5);
//         break;
//       case "/dashboard-history-all":
//         setSelectedIndex(6);
//         break;
//       default:
//         setSelectedIndex(-1);
//     }
//  });

function handleSelect(event){
  console.log(event.target);
};


    return(
        <List component="nav">

            <React.Fragment>

              <ListItemButton
              selected={selectedIndex===0}
              onClick={handleSelect}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Strona główna" />
              </ListItemButton>

              <ListItemButton
              id="0"
              selected={selectedIndex===1}
              onClick={handleSelect}>
                <ListItemIcon>
                <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Zamówienia" />
              </ListItemButton>

              <ListItemButton
              id="0"
              selected={selectedIndex===2}
              onClick={handleSelect}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Promocje" />
              </ListItemButton>

              <ListItemButton
              id="0"
              selected={selectedIndex===3}
              onClick={handleSelect}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Asortyment" />
              </ListItemButton>

              <Divider sx={{ my: 1 }} />
              <ListSubheader component="div" inset>
                Historia zamówień
              </ListSubheader>

              <ListItemButton
              id="0"
              selected={selectedIndex===4}
              onClick={handleSelect}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Ostatni miesiąc" />
              </ListItemButton>

              <ListItemButton
              id="0"
              selected={selectedIndex===5}
              onClick={handleSelect}>
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
