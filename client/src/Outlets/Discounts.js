import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from './Title';

function Discounts(){
    return (
      <React.Fragment>
         <Typography component="h2" variant="h3" color="primary" gutterBottom>
              Promocje
        </Typography>
        <Grid item xs={12} container spacing={3}>
          {fakeData.map((row) => (
            <Grid item xs={4} key={row.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 120,
              }}
            >
            <Title color="secondary">{row.name}</Title>
              <Typography color="text.primary" sx={{ flex: 1 }}>
              {row.name + " -> " + row.newPrice + row.unit}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
              Do wyczerpania zapasów
              </Typography>
            </Paper>
            </Grid>
            ))}
        </Grid>
        </React.Fragment>
    );
}

function createFakeData(id, name, unit, price, newPrice) {
  return { id, name, unit, price, newPrice};
}

const fakeData = [
  createFakeData(0,'BAMBERSKA','zł/szt','16,60','14,20'),
  createFakeData(1,'BOCZEK ROLOWANY','zł/szt','17,20','15,00'),
  createFakeData(2,'FRANKFURTERKI','zł/p','11,20','10,20'),
  createFakeData(3,'GÓRNA ZRAZOWA MIĘSO','zł/kg','9,90','8,50'),
  createFakeData(4,'JAŁOWCOWA','zł/p','12,50','11,00'),
  createFakeData(5,'KANAPKOWA','zł/szt','24,60','23,20'),
  createFakeData(6,'ŁOPATKA 4/D','zł/szt','15,90','13,30'),
  createFakeData(7,'MYŚLIWSKA','zł/p','13,00','12,00'),
];

export default Discounts;