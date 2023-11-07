import React from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard"
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';

function MenuList(props){
  const [selectedIndex, setSelectedIndex] = React.useState(0);


  function handleClick(i){
    setSelectedIndex(i);
    props.selectedItem(i);
    props.headerText("WIKOD - " + items[i].name)
  }

  const items = [
    {name:"Strona główna", icon: DashboardIcon, href: null},
    {name:"Zamówienia", icon: ShoppingCartIcon, href:null},
    {name:"Promocje", icon: DiscountIcon, href:null},
    {name:"Asortyment", icon: ListIcon, href:null},
    {name:"Historia", icon: HistoryIcon, href:null},
    {name:"Wyloguj", icon: LogoutIcon, href:"/logout"},
  ];
    return(
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map((Item, index) => {
        const labelId = `list-label-${index}`;
        return (
          <div>
          {index===items.length-1 ? (<Divider sx={{ my: 1 }} /> ) : ( <></> )}
            <ListItemButton
            key={index} 
            selected={selectedIndex===index}
            onClick={()=> {handleClick(index)}} 
            href={Item.href}>
              <ListItemIcon>
              <Item.icon />
              </ListItemIcon>
              <ListItemText id={labelId} primary={Item.name} />
            </ListItemButton>
          </div>
        );
      })}
    </List>
    );
}
export default MenuList;
