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

function MenuList(props){
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClick(i){
    setSelectedIndex(i);
    props.selectedItem(i);
  }

  const Items = [
    {name:"Strona główna"},
    {name:"Zamówienia"},
    {name:"Promocje"},
    {name:"Asortyment"},
    {name:"Strona główna"},
    {name:"Strona główna"},
    {name:"Strona główna"},
  ];
    return(
        <List component="nav">

            <React.Fragment>

              <ListItemButton
              selected={selectedIndex===0}
              onClick={()=> {handleClick(0)}}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Strona główna" />
              </ListItemButton>

              <ListItemButton
              selected={selectedIndex===1}
              onClick={()=> {handleClick(1)}}>
                <ListItemIcon>
                <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Zamówienia" />
              </ListItemButton>

              <ListItemButton
              selected={selectedIndex===2}
              onClick={()=> {handleClick(2)}}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Promocje" />
              </ListItemButton>

              <ListItemButton
              selected={selectedIndex===3}
              onClick={()=> {handleClick(3)}}>
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
              selected={selectedIndex===4}
              onClick={()=> {handleClick(4)}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Ostatni miesiąc" />
              </ListItemButton>

              <ListItemButton
              selected={selectedIndex===5}
              onClick={()=> {handleClick(5)}}>
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
