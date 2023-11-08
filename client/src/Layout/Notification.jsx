import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';


function Notification(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [items, setItems] = React.useState([
        {text: "Promocja na Szynke Zbójnicką"},
        {text: "Nowy termin dostaw juz dostępny !"},
        {text: "Płatność nr 34 po terminie"},
        {text: "Brak adresu dostawy dla sklepu nr 2"}
    ]);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    function handleClose(i){
        console.log(i);
        if(i>=0){
        setItems((arr) => 
        arr.filter((_,index) => index !== i))}
    setAnchorEl(null);
    };


    return (
        <IconButton color="inherit">
            <Badge badgeContent={items.length} color="secondary" onClick={handleClick}>
                <NotificationsIcon />
            </Badge>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(-1)}
            >
            {items.length>0 ? (items.map((item,index)=>{
                return(
                    <MenuItem key={index} onClick={() => handleClose(index)}>{item.text}</MenuItem>
                );
            })) : (<MenuItem key={0} onClick={() => handleClose(0)}>Brak powiadomien</MenuItem>) }
            </Menu>
      </IconButton>
    );
}
export default Notification;