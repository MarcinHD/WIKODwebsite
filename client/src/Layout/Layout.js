import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Collapse from '@mui/material/Collapse';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuList from './MenuList';
import Header from './Header';
import Orders from '../Outlets/Orders';
import Home from '../Outlets/Home';
import Discounts from '../Outlets/Discounts';
import Products from '../Outlets/Products';
import History from '../Outlets/History';
  
const defaultTheme = createTheme();

function Layout(){
  const [showAlert, setShowAlert] = React.useState(false);
  const [page, setPage] = React.useState(0);

  function switchPage(){
    switch(page){
      case 0:
        return <Home/>
      case 1:
        return <Orders />;
      case 2:
        return <Discounts />;
      case 3:
        return <Products />;
      case 4:
        return <History />;
      default:
        return <Home/>
    }
  }

  function handlePageChange(i){
    setPage(i);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header openMenu={setShowAlert} page={setPage}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {switchPage()}
                {/* <Outlet /> */}
            </Grid>
            <Footer sx={{ pt: 4 }} />
            <Collapse in={showAlert}>
              <Alert severity="error">This is an error alert — check it out!</Alert>
            </Collapse>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;