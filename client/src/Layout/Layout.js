import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Collapse from '@mui/material/Collapse';
import Footer from './Footer';
import Header from './Header';
import Orders from '../Outlets/Orders';
import Home from '../Outlets/Home';
import Discounts from '../Outlets/Discounts';
import Products from '../Outlets/Products';
import History from '../Outlets/History';
  

function Layout(){
  const [showAlert, setShowAlert] = React.useState(false);
  const [page, setPage] = React.useState(0);

  function switchPage(){
    switch(page){
      case 0:
        return <Home changePage={setPage}/>
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
  return (
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
  );
}

export default Layout;