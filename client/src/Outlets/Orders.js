import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

  const [autoCompleteValue, setAutoCompleteValue] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("");
  const [inputNumberValue, setInputNumberValue] = React.useState(0);
  const [inputDescValue, setInputDescValue] = React.useState("");
  

    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const [notes, setNotes] = React.useState([]);
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

  const handleClickButton = (event) => {
    console.log(autoCompleteValue + " " + selectValue + " " + inputNumberValue + " " + inputDescValue);
  };

    function addNote(newNote) {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      setNotes((prevNotes) => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setSelectValue(event.target.value);
    };


    return (
        <React.Fragment>
                 <Typography component="h2" variant="h3" color="primary" gutterBottom>
              Dodaj zamówienie
        </Typography>
       <Grid item xs={12}>
           <Paper
             sx={{
               p: 2,
               display: 'flex',
               flexDirection: 'column',
               height: '80vh',}}>

<Stack spacing={2}>       
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}>
          <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => setAutoCompleteValue(event.target.value)}
                    options={products}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Dodaj pozycje" />}/>
        </Grid>
        <Grid item xs={1} md={2}>
        <FormControl sx={{ minWidth: 120 }}>
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
            <MenuItem value={10}>Kg</MenuItem>
            <MenuItem value={20}>Szt</MenuItem>
            <MenuItem value={30}>P</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={2} md={3}>
            <TextField  id="outlined-number"
                        label="Ilość"
                        type="number"
                        onChange={(event, value) => setInputNumberValue(event.target.value)}
                        InputLabelProps={{shrink: true,}}/>
        </Grid>
        <Grid item xs={2} md={3}>
            <Box component="form" sx={{'& > :not(style)': {width: '25ch' },}} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Opis" variant="outlined" onChange={(event, value) => setInputDescValue(event.target.value)} />
            </Box>
        </Grid>
        <Grid item xs={1} md={1}>
        <Button variant="contained" onClick={handleClickButton}>Dodaj</Button>
        </Grid>
      
      </Grid>

    <Divider />

    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    <Divider />
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