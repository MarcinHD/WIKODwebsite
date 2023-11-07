import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';


function Notification(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const items = [
        {text: "Promocja na Szynke Zbójnicką"},
        {text: "Nowy termin dostaw juz dostępny !"},
        {text: "Płatność nr 34 po terminie"},
        {text: "Brak adresu dostawy dla sklepu nr 2"}
    ];


    return (
        <IconButton color="inherit">
            <Badge badgeContent={items.length} color="secondary" onClick={handleClick}>
                <NotificationsIcon />
            </Badge>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
            {items.map((item,index)=>{
                return(
                    <MenuItem key={index} onClick={handleClose}>{item.text}</MenuItem>
                );
            })}
            </Menu>
      </IconButton>
    );
}
export default Notification;