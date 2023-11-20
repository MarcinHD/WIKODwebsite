import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './Row';

function TableApprovedOrders(props) {
    const { approvedOrders } = props;

    return(
    <React.Fragment>
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Gotowe zamówienia</TableCell>
              <TableCell align="left">Termin dostawy</TableCell>
              <TableCell align="left">Lokalizacja</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedOrders && approvedOrders.map((row, index) => (
              <Row 
              row={row} 
              index={index} 
              userData={props.userData}
              onSent={props.onSent} 
              onEdit={props.onEdit} 
              onDelete={props.onDelete}
              onDeliveryDate={props.onDeliveryDate}
              onDestination={props.onDestination}
              />))}
          </TableBody>
        </Table>
    </React.Fragment>
    );
};
export default TableApprovedOrders;