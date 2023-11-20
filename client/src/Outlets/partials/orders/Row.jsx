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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { nextDate, disabledDays, formatDate } from './Date';

// row={row} 
// index={index} 
// userData={props.userData}
// onSent={props.onSent} 
// onEdit={props.onEdit} 
// onDelete={props.onDelete}
// onDeliveryDate={props.onDeliveryDate}
// onDestination={props.onDestination}

function Row(props) {
    const { row, index, userData } = props;
    const [open, setOpen] = React.useState(false);
    const [datePickerValue, setDatePickerValue] = React.useState("");
    const [error, setError] = React.useState(false);
    const [selectDestination, setSelectDestination] = React.useState(userData.destination.at(0));

    const handleDeliveryDate = (date) => {
      setDatePickerValue(date);
      props.onDeliveryDate(index, formatDate(date));
      setError(!(new Date(date).getTime()>=new Date(nextDate().subtract(1,'day')).getTime()));
    }
    const handleDestinationChange = (event) => {
      const destinationIndex = userData.destination.map(item => item.place).indexOf(event.target.value.place);
      setSelectDestination(event.target.value);
      props.onDestination(destinationIndex)
      console.log("Change !@");
    }
  
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
            Zamówienie nr {index + 1}
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Wybierz" 
                minDate={nextDate()}
                defaultValue={nextDate()}
                disablePast={true} 
                shouldDisableDate={disabledDays} 
                onChange={handleDeliveryDate}
                slotProps={{textField: {size: 'small'}}}/>
              </DemoContainer>
            </LocalizationProvider>
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            <FormControl sx={{ m: 1, minWidth: 160 }} size="small" >
              <Select
                labelId="select-label"
                id="simple-select"
                defaultValue={selectDestination}
                value={selectDestination}
                onChange={handleDestinationChange}
              >
              {userData.destination.map((item)=>{
                return (
                <MenuItem value={item}>{item.place}</MenuItem>
                )})}
              </Select>
            </FormControl>
          </TableCell>
          <TableCell align="right">
          <Button
                  variant="outlined"
                  color="success"
                  key={index}
                  onClick={error ? (console.log("Wrong date - Error")) : (props.onSent(index))}>
                  Wyślij
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  key={index}
                  onClick={props.onEdit(index)}>
                  Edytuj
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  key={index}
                  onClick={props.onDelete(index)}>
                  Usuń
                </Button>
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
                    {row.data.map((historyRow, historyIndex) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row" align="left">
                          {historyIndex+1}.
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
          name: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          unit: PropTypes.string.isRequired,
          desc: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        }),
      ).isRequired,
  };
  
  export default Row;