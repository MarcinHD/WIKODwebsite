import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Home(){
    return (
        <Grid container spacing={3}>

        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          <img className="img-fluid" 
                src={`${process.env.PUBLIC_URL}/images/dashboard.jpg`} 
                alt="logo"
                height={210}
                />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

          </Paper>
        </Grid>
      </Grid>
    );
}

export default Home;