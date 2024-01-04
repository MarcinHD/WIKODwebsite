import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './partials/history/Row';
import { HistoryContext } from '../Context/HistoryContext';

function History(){
  const {history, setHistory} = React.useContext(HistoryContext);

    if(!history) return <h1>No connection to DBs</h1>

    return (
        <div>
        <h1>Historia</h1>
        <div style={{ height: '70vh', width: '120%' }}>
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Lp</TableCell>
              <TableCell align="left">Data wystawienia</TableCell>
              <TableCell align="left">Termin dostawy</TableCell>
              <TableCell align="left">Lokalizacja</TableCell>
              <TableCell align="right">Płatność</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length>0 && history.map((row, index) => (
              <Row 
              row={row} 
              indexRow={index} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    );
}

export default History;