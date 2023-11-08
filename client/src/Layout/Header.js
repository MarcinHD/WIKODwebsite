import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuList from './MenuList';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useFindPath } from '../Hooks/FindPath';
import Notification from './Notification';
import Settings from './Settings';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const drawerWidth = 240;

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

function Header(props){
    // OPEN/CLOSE MENULIST LOGIC
    const [open, setOpen] = React.useState(loadState);
    const toggleDrawer = () => {
      setOpen(!open);
      props.openMenu(open);
    };

    function changePage(i){
      props.page(i);
      setTitleText(i);
    }

    // SAVE AND LOAD PAGE STATE(open/close menuList)
    function loadState(){
      const localVar=JSON.parse(window.sessionStorage.getItem("open"));
      props.openMenu(!localVar);
      return localVar === "undefined" ? null : localVar;
    }
    React.useEffect(() => {
        window.sessionStorage.setItem("open", open);
      }, [open]);
    
    const [titleText, setTitleText] = React.useState("WIKOD - Strona Główna");
  

    return(
        <div>
        <AppBar position="absolute" open={open}>
        <Toolbar sx={{pr: '24px'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{marginRight: '36px',...(open && { display: 'none' })}}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {titleText}
          </Typography>
            <Notification />
            <Divider sx={{ mx: 0.5 }}/>
            <Settings />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1]}}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
          <MenuList selectedItem={changePage} headerText={setTitleText}/>
      </Drawer>
      </div>
    );
}

export default Header;