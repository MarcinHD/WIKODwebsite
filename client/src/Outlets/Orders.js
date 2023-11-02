import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Typography, inputAdornmentClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Note from "./partials/Note";
import CreateArea from './partials/CreateArea';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Orders(){

  const OrderPosition = (code, name, unit, count, desc) => { return {code: code, name: name, unit: unit, count: count, desc: desc} };
  const Order = (...OrderPosition) => { return {data: OrderPosition} };
const orderPositionExample0 = OrderPosition("10-02-0395","BABUNI MIĘSO","szt",2,"-");
const orderPositionExample1 = OrderPosition("70-05-0042","BALERON PARZONY","szt",3, "-");
const orderPositionExample2 = OrderPosition("70-01-0709","BAMBERSKA","p",6, "bez folii");
const orderPositionExample3 = OrderPosition("70-01-0071","BIAŁA PARZONA","p",1, "wacum");
const order0 = Order(orderPositionExample0, orderPositionExample1, orderPositionExample2, orderPositionExample3);

  const [pageHeight, setPageHeight] = React.useState();
  const [detectError, setDetectError] = React.useState(false);
  const [productCode, setProductCode] = React.useState("");
  const [autoCompleteValue, setAutoCompleteValue] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("");
  const [inputNumberValue, setInputNumberValue] = React.useState("");
  const [inputDescValue, setInputDescValue] = React.useState("");
  const [tableData, setTableData] = React.useState(order0.data);
  const [sentOrders, setSentOrders] = React.useState([]);

    const products = [
      {id:1,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
      {id:2,code:"70-05-0042",name:"BALERON PARZONY",unit:"szt",price:15.9},
      {id:3,code:"70-01-0709",name:"BAMBERSKA",unit:"p",price:16.6},
      {id:4,code:"70-01-0071",name:"BIAŁA PARZONA",unit:"p",price:16.1},
      {id:5,code:"70-01-0004",name:"BIAŁA SUROWA",unit:"p",price:15.6},
      {id:6,code:"70-08-0701",name:"BIGOS WYBOROWY",unit:"szt",price:13.5},
      {id:7,code:"10-02-0300",name:"BIODRÓWKA",unit:"szt",price:10.5},
      {id:8,code:"10-02-0401",name:"BOCZEK BEZ KOŚCI B/S B/P KL.S",unit:"szt",price:17},
      {id:9,code:"10-02-0428",name:"BOCZEK BEZ KOŚCI Z/S B/P KL.S",unit:"szt",price:15.8},
      {id:10,code:"70-05-0137",name:"BOCZEK CYGAŃSKI",unit:"szt",price:14.9},
      {id:11,code:"70-05-0269",name:"BOCZEK DĘBOWY PASKI",unit:"szt",price:14.9},
      {id:12,code:"70-05-0745",name:"BOCZEK GOSPODARZA",unit:"szt",price:14.9},
      {id:13,code:"70-05-0746",name:"BOCZEK GOSPODARZA Z CZOSNKIEM",unit:"szt",price:14.8},
      {id:14,code:"10-02-0301",name:"BOCZEK ŁUSKANY B/S B/P KL.S",unit:"szt",price:16.8},
      {id:15,code:"10-02-0390",name:"BOCZEK ŁUSKANY Z/S B/P KL.S",unit:"szt",price:16},
      {id:16,code:"10-02-0354",name:"BOCZEK ŁUSKANY Z/S Z/P KL.S",unit:"szt",price:15.9},
      {id:17,code:"70-07-0208",name:"BOCZEK NA GRILLA",unit:"szt",price:14.5},
      {id:18,code:"70-05-0129",name:"BOCZEK PARZONY BEZ SKÓRY",unit:"szt",price:14.9},
      {id:19,code:"70-05-0089",name:"BOCZEK PARZONY PASKI",unit:"szt",price:16.9},
      {id:20,code:"70-05-0861",name:"BOCZEK PIECZONY TRADYCYJNIE",unit:"szt",price:15.9}
  ];



  const handleClickButton = () => {
    
    if(autoCompleteValue==="" || inputNumberValue===""){
      setDetectError(true);
    } else{
    setTableData([
      ...tableData,
      {code:productCode,name:autoCompleteValue,unit:selectValue,count:inputNumberValue, desc:(inputDescValue==="" ? "-" : inputDescValue)}
    ]);
    setProductCode("");
    setAutoCompleteValue("");
    setSelectValue("");
    setInputNumberValue("");
    setInputDescValue("");
    setDetectError(false);
  }
  };

  const handleSentOrder = () => {
    const temp = [];
    tableData.forEach((e) => {
      temp.push(OrderPosition(e.code,e.name,e.unit,e.count,e.desc))
    });
    setSentOrders(...sentOrders, Order(temp));
    setTableData([]);
    };
  

    const handleChange = (event) => {
      setSelectValue(event.target.value);
    };

    function handleAutoCompleteChange(value){
      if(value!=null){
      setProductCode(value.code);
      setAutoCompleteValue(value.name);
      setSelectValue(value.unit);
      setInputNumberValue("");
      setInputDescValue("");
      }
    };

    const handleDeleteRow = (rowIndex) => {
      setTableData((prevList) =>
        prevList.filter((item, index) => index !== rowIndex)
      );
    };


    return (
        <React.Fragment>
                 <Typography component="h2" variant="h3" color="primary" gutterBottom sx={{ p: 3 }}>
              Dodaj zamówienie
        </Typography>
       <Grid item xs={12}>
           <Paper
             sx={{
               p: 3,
               display: 'flex',
               flexDirection: 'row',
               minWidth: 1000,
               }}>

<Stack spacing={4}>       
        <Stack direction="row" spacing={2} alignContent={'center'}>
        
          <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.name}
                    key={tableData}
                    onChange={(event, value) => handleAutoCompleteChange(value)}
                    options={products}
                    sx={{ minWidth: 300 }}
                    renderInput={(params) => <TextField {...params} 
                    label="Dodaj pozycje" 
                    error={autoCompleteValue.length === 0 && detectError}
                    helperText={autoCompleteValue.length === 0 && detectError ? "Wymagane pole" : ""}
                    />}
                      
                    />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">Jednostka</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectValue}
            label="Jednostka"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Brak</em>
            </MenuItem>
            <MenuItem value={"kg"}>Kg</MenuItem>
            <MenuItem value={"szt"}>Szt</MenuItem>
            <MenuItem value={"p"}>P</MenuItem>
          </Select>
        </FormControl>
            <TextField  id="outlined-number"
                        label="Ilość"
                        type="number"
                        sx={{ minWidth: 150 }}
                        value={inputNumberValue}
                        onChange={(event, value) => setInputNumberValue(event.target.value)}
                        InputLabelProps={{shrink: true,}}
                        error={inputNumberValue.length === 0 && detectError}
                        helperText={inputNumberValue.length === 0 && detectError ? "Wymagane pole" : ""}
                        />
            <Box component="form" sx={{'& > :not(style)': {minWidth: 150 },}} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Opis" value={inputDescValue} variant="outlined" onChange={(event, value) => setInputDescValue(event.target.value)} />
            </Box>
        <Button variant="contained" onClick={handleClickButton}>Dodaj</Button>
    </Stack>
    <Container sx={{ display: tableData.length===0 ? 'none':''}}>
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
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteRow(index)}>
                  Usuń
                </Button>
          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
                  sx={{minWidth: 1000}}
                  variant="contained" 
                  color="success"
                  onClick={handleSentOrder}>
                  Wyślij
                </Button>
                </Container>
      <Container sx={{ display: sentOrders.length===0 ? 'none':''}}>
      <Divider sx={{ display: tableData.length===0 ? 'none':''}} />

      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Wysłane zamówienia</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sentOrders===0? "":[sentOrders].map((row, index) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Zamówienie nr {index}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary">
                  Edytuj
                </Button>
          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Container>

   </Stack>
   


                   {/* <CreateArea onAdd={addNote} />
                    {notes.map((noteItem, index) => {
                        return (
                        <Note
                            key={index}
                            id={index}
                            title={noteItem.title}
                            content={noteItem.content}
                            onDelete={deleteNote}
                        />
                        );
                    })} */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Controlled calendar">
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoItem>
                </LocalizationProvider> */}
           </Paper>
       </Grid>
       </React.Fragment>
    );
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default Orders;