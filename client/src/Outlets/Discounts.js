import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Discounts(){
    return (
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '80vh',
            }}
          >
          </Paper>
        </Grid>

    );
}

export default Discounts;