import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function TableOrderPositions(props) {
    const { tableData } = props;

    return (
    <React.Fragment>
    <Divider />
      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Twoje zamówienie</TableCell>
              <TableCell align="right">Kod produktu</TableCell>
              <TableCell align="right">Jedn.</TableCell>
              <TableCell align="right">Ilosc</TableCell>
              <TableCell align="right">Opis</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="error" onClick={() => props.onDeleteItem(index)}>Usuń</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <Button sx={{minWidth: 1000}} variant="contained" color="success" onClick={() => props.onApprove()}>Zatwierdź</Button>
    </React.Fragment>
    );
};
export default TableOrderPositions;