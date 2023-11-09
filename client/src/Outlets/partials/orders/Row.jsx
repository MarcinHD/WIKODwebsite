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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { convertToLocalTime } from 'date-fns-timezone';
import dayjs from 'dayjs';




function Row(props) {
    const { row } = props;
    const { indexRow } = props;
    const [open, setOpen] = React.useState(false);
    const [detectError, setDetectError] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [datePickerValue, setDatePickerValue] = React.useState("");

    const errorMessage = React.useMemo(() => {
      switch (error) {
        case 'maxDate':
        case 'minDate': {
          return 'Zaznacz date z najblizszego tygodnia';
        }
  
        case 'invalidDate': {
          return 'Wprowadzona data jest nieprawidłowa';
        }
  
        default: {
          return '';
        }
      }
    }, [error]);


    const handleSent = () => {
      if(datePickerValue.length===0 || datePickerValue==="" ){
        setDetectError(true);
      } else {
      setDetectError(false);
      props.onSent(indexRow);
      }
    }
    const handleEdit = () => props.onEdit(indexRow);
    const handleDelete = () => props.onDelete(indexRow);
    const handleDeliveryDate = (date) => {
      setDatePickerValue(date);
      props.deliveryDate(indexRow, formatDate(date));
    }
    const today = dayjs();
    const disabledDays = (date) => {
      const day = date.day();
      return day === 0 || day === 1  || day === 3 || day === 5  || day === 6;
    };
    function nextDate(){
      const date = dayjs();
      const day = date.get('day');
      for(var i=0;i<7;i++){
      if(day===2||day===4){
        console.log("Koniec");
        console.log(day)
        console.log(date)
        return date;
      } else{
        date = date.add(1,'day');
        console.log("again...");
        console.log(day)
        console.log(date)
      }
      day = date.get('day');
    }
    }
    const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
    const formatDate = (date) => {
      if (!date) return new Date().toLocaleString();

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const dateTmp = Date.parse(date.toLocaleString());

      const localDate = convertToLocalTime(dateTmp, {
        timeZone: timezone,
      });
      return format(localDate, DEFAULT_DATE_FORMAT);
    };
  
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Wybierz" 
                // minDate={dayjs()+10}
                // defaultValue={nextDate()}
                disablePast={true} 
                // shouldDisableDate={disabledDays} 
                onChange={handleDeliveryDate}
                onError={(newError) => setError(newError)}
                slotProps={{
                    textField: {
                      helperText: errorMessage,
                      size: 'small'
                    }}}
                  minDate={nextDate()}
                  maxDate={nextDate().add(10,'day')}
                // error={datePickerValue.length === 0 && detectError}
                // helperText={datePickerValue.length === 0 && detectError ? "Wymagane pole" : ""}
                />
              </DemoContainer>
            </LocalizationProvider>
          </TableCell>
          <TableCell align="right">
          <Button
                  variant="outlined"
                  color="success"
                  key={indexRow}
                  onClick={handleSent}
                  >
                  Wyślij
                </Button>
          <Button
                  variant="outlined"
                  color="primary"
                  key={indexRow}
                  onClick={handleEdit}
                  >
                  Edytuj
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  key={indexRow}
                  onClick={handleDelete}
                  >
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
                    {row.data.map((historyRow, index) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row" align="left">
                          {index+1}.
                        </TableCell>
                        <TableCell align="left">{historyRow.name}</TableCell>
                        <TableCell align="right">{historyRow.code}</TableCell>
                        <TableCell align="right">{historyRow.unit}</TableCell>
                        <TableCell align="right">{historyRow.count}</TableCell>
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