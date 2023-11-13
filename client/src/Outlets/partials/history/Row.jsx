import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const { indexRow } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell width={100}>
            <IconButton
              align="left"
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            Zamówienie nr {indexRow + 1}
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            {row.order.deliveryDate}
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            {row.destination.place}
          </TableCell>
          <TableCell align="right">
            {row.user.payment}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Asortyment
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Lp.</TableCell>
                      <TableCell align="left">Nazwa</TableCell>
                      <TableCell align="right">Kod produktu</TableCell>
                      <TableCell align="right">Jedn.</TableCell>
                      <TableCell align="right">Ilosc</TableCell>
                      <TableCell align="right">Opis</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.order.data.map((historyRow, index) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row" align="left">
                          {index+1}.
                        </TableCell>
                        <TableCell align="left">{historyRow.name}</TableCell>
                        <TableCell align="right">{historyRow.code}</TableCell>
                        <TableCell align="right">{historyRow.unit}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">{historyRow.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  Row.propTypes = {
    indexRow: PropTypes.number.isRequired,
    row: PropTypes.arrayOf(
        PropTypes.shape({
          destination: PropTypes.arrayOf(
            PropTypes.shape({
              place: PropTypes.string.isRequired,
              address: PropTypes.arrayOf(
                PropTypes.shape({
                  city: PropTypes.string.isRequired,
                  street: PropTypes.string.isRequired,
                  number: PropTypes.string.isRequired,
                }),
              ).isRequired,
            }),
          ).isRequired,
          order: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              code: PropTypes.string.isRequired,
              unit: PropTypes.string.isRequired,
              desc: PropTypes.string.isRequired,
              amount: PropTypes.number.isRequired,
            }),
          ).isRequired,
        }),
      ).isRequired,
  };
  export default Row;
