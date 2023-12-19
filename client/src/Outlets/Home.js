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
import Title from './partials/Title';
import { UserContext } from '../Context/UserContext';
import { HistoryContext } from '../Context/HistoryContext';
import { formatDate, nextDate } from './partials/orders/Date';
import { CurrentPageContext } from '../Context/CurrentPage';

function Home(){
  const {userData, setUserData} = React.useContext(UserContext);
  const {history, setHistory} = React.useContext(HistoryContext);
  const {page, setPage, pageName} = React.useContext(CurrentPageContext);

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
                src={`${process.env.PUBLIC_URL}/images/dashboard${Math.floor(Math.random() * 6) + 1}.jpg`} 
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
          {userData ? (<Title>Dzień dobry {userData.user.firstName}</Title>) :(<Title>Dzień dobry !</Title>)}
          <Typography color="text.primary" sx={{ flex: 1 }}>
              Witamy w serwisie zamówień WIKOD.
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
              Następna dostawa towaru: 
              {formatDate(nextDate())}
              </Typography>
              <Link onClick={()=> setPage(1)} color="inherit" underline="hover">
                  Złóż zamówienie !
              </Link>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Ostatnie zamówienia</Title>
        {history ? (<Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data dostawy</TableCell>
            <TableCell>Sklep</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Asortyment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.toReversed().map((row, index) => (index<5&&
            <TableRow key={row.order._id}>
              <TableCell>{row.order.deliveryDate}</TableCell>
              <TableCell>{row.order.deliveryDestination.place}</TableCell>
              <TableCell>
              {row.order.deliveryDestination.address.city + ", " +
                row.order.deliveryDestination.address.street + " " +
                row.order.deliveryDestination.address.number}
                </TableCell>
              <TableCell>
              <Link onClick={()=>{
                setPage(4);
                window.localStorage.setItem("HistoryLinkIndex",history.length-1-index);
                }}
                color="inherit" 
                underline="hover">
                  {row.order.data.map((item, itemIndex) => (itemIndex<3 && 
                  <>
                    {item.name + ", "}
                  </>
                  ))}
                  ...
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>) : (<Title>Brak historii</Title>)}
          </Paper>
        </Grid>
      </Grid>
      </React.Fragment>
    );
}

export default Home;