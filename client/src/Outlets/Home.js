import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function Home(props){
  function preventDefault(event) {
    event.preventDefault();
    props.changePage(1);
    console.log("OK");
  }
  const dateDay = new Date();
  const dateMonth = new Date().getMonth;
  const dateYear = new Date().getFullYear;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          <img className="img-fluid" 
                src={`${process.env.PUBLIC_URL}/images/dashboard1.jpg`} 
                alt="logo"
                height={210}
                />
          </Paper>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          <Title>Dzień dobry !</Title>
          <Typography color="text.primary" sx={{ flex: 1 }}>
              Witamy w serwisie zamówień WIKOD.
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
              Następna dostawa towaru: 
              30 paźdzernika 2023.
              </Typography>
              <div>
                <Link color="primary" onClick={preventDefault}>
                  Złóż zamówienie
                </Link>
              </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Ostatnie zamówienia</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Sklep</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Metoda płatności</TableCell>
            <TableCell>Asortyment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>
              <Link color="primary" onClick={preventDefault}>
                  Szczegóły ...
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </Paper>
        </Grid>
      </Grid>
      </React.Fragment>
    );
}

function createFakeData(id, date, name, shipTo, paymentMethod) {
  return { id, date, name, shipTo, paymentMethod};
}

const fakeData = [
  createFakeData(0,'19 Paź, 2023','Stefan Piasecki - Moje wedliny','Wrocław ul. Oławska 30','Przelew'),
  createFakeData(1,'17 Paź, 2023','Stefan Piasecki - Moje wedliny','Wrocław ul. Oławska 30','Przelew'),
  createFakeData(2,'17 Paź, 2023','Stefan Piasecki - Przysmak','Wrocław ul. Zielonogórska 12','Gotówka'),
  createFakeData(3,'12 Paź, 2023','Stefan Piasecki - Moje wedliny','Wrocław ul. Oławska 30','Przelew'),
  createFakeData(4,'10 Paź, 2023','Stefan Piasecki - Przysmak','Wrocław ul. Zielonogórska 12','Gotówka'),
];

export default Home;