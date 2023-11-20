import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Order, OrderPosition} from './Order';

function SelectMenu(props) {

     // <== REACT HOOKS ==> 
    const inputRef = React.useRef(null);

    const [newPosition, setNewPosition] = React.useState(OrderPosition("","","","",""));
    const [detectError, setDetectError] = React.useState(false);
    const [productsList, setProductsList] = React.useState([]);

    React.useEffect(() => {
      fetch("http://localhost:5000/products")
      .then(response => response.json())
      .then(response => setProductsList(response))
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

  // <== HANDLE FUNCTIONS ==> 
      function handleAutoCompleteChange(value){
        setNewPosition({
          code: value.code,
          name: value.name,
          unit: value.unit,
          amount: "",
          description: "",
        })};
      function handleUnitChange(value){
        setNewPosition({
          ...newPosition,
          unit: value,
        })};
  
      function handleAmountChange(event){
        setNewPosition({
          ...newPosition,
          amount: event.target.value,
        })};

      function handleDescriptionChange(event){
        setNewPosition({
          ...newPosition,
          description: event.target.value,
        })};

      function handleAdd(){
        if(newPosition.name==="" || newPosition.amount==="" || Number(newPosition.amount)<=0 ){
            setDetectError(true);
          } else{
            props.onAdd(newPosition);
            setNewPosition(OrderPosition("","","","",""));
            setDetectError(false);
          }
          inputRef.current.focus();
        };
// <== COMPONENT ==> 
    return(
        <Stack direction="row" spacing={2} alignContent={'center'}>
{/* // <== AUTOCOMPLETE - PRODUCT NAME ==>  */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(option) => option.name}
              onChange={(e,value) => handleAutoCompleteChange(value)}
              options={productsList}
              sx={{ minWidth: 300 }}
              renderInput={(params) => <TextField {...params} 
              label="Dodaj pozycje" 
              inputRef={inputRef}
              error={newPosition.name.length === 0 && detectError}
              helperText={newPosition.name.length === 0 && detectError ? "Wymagane pole" : ""}/>}
              />
{/* // <== SELECT - PRODUCT UNIT ==>  */}
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-helper-label">Jednostka</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={newPosition.unit}
                label="Jednostka"
                onChange={(e,value) => handleUnitChange(value)}>
                <MenuItem value="">
                  <em>Brak</em>
                </MenuItem>
                <MenuItem value={"kg"}>Kg</MenuItem>
                <MenuItem value={"szt"}>Szt</MenuItem>
                <MenuItem value={"p"}>P</MenuItem>
              </Select>
            </FormControl>
{/* // <== INPUT - PRODUCT AMOUNT ==>  */}
            <TextField  
              id="outlined-number"
              label="Ilość"
              type="number"
              sx={{ minWidth: 150 }}
              value={newPosition.amount}
              onChange={handleAmountChange}
              InputLabelProps={{shrink: true,}}
              error={(newPosition.amount.length === 0 || Number(newPosition.amount) <= 0) && detectError }
              helperText={(newPosition.amount.length === 0 || Number(newPosition.amount) <= 0) && detectError  ? "Wymagane pole" : ""}
              />
{/* // <== SELECT - PRODUCT DESCRIPTION ==>  */}
              <Box component="form" sx={{'& > :not(style)': {minWidth: 150 },}} noValidate autoComplete="off">
              <TextField 
                id="outlined-basic" 
                label="Opis" 
                value={newPosition.description} 
                variant="outlined" 
                onChange={handleDescriptionChange} 
                />
              </Box>
      <Button variant="contained" onClick={handleAdd}>Dodaj</Button>
  </Stack>
    );
};
export default SelectMenu;