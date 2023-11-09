import * as React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './Row';

function TableApprovedOrders(props) {
    const { tableData } = props;
    const { approvedOrders } = props;

    function handleSentOrder(i){ props.onSent(i)};
    function handleEditOrder(i){ props.onEdit(i)};
    function handleDeleteOrder(i){ props.onDelete(i)};
    function handleDeliveryDateChange(i,date){ props.onDeliveryDate(i,date)};

    return(
    <Container sx={{ display: approvedOrders.length===0 ? 'none':''}}>
    <Divider sx={{ display: tableData.length===0 ? 'none':''}} />
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Gotowe zamówienia</TableCell>
              <TableCell align="left">Termin dostawy</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedOrders===0? "":approvedOrders.map((row, index) => (
              <Row 
              row={row} 
              indexRow={index} 
              onSent={handleSentOrder} 
              onEdit={handleEditOrder} 
              onDelete={handleDeleteOrder}
              deliveryDate={handleDeliveryDateChange}
              />
            ))}
          </TableBody>
        </Table>
    </Container>
    );
};
export default TableApprovedOrders;