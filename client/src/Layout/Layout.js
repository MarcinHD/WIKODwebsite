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
import Outlet from './Outlet';


function Layout(){
  // const [showAlert, setShowAlert] = React.useState(false);

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header/>
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
              <Outlet />
            </Grid>
            <Footer sx={{ pt: 4 }} />
            {/* <Collapse in={showAlert}>
              <Alert severity="error">This is an error alert — check it out!</Alert>
            </Collapse> */}
          </Container>
        </Box>
      </Box>
  );
}

export default Layout;