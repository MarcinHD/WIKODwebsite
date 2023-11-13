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
import {OrderPosition} from './Order';

function SelectMenu(props) {
    const { tableData } = props;

    const inputRef = React.useRef(null);

    // <== REACT STATE ==> 
    const [detectError, setDetectError] = React.useState(false);
    const [productCode, setProductCode] = React.useState("");
    const [autoCompleteName, setAutoCompleteName] = React.useState("");
    const [selectUnit, setSelectUnit] = React.useState("");
    const [inputNumber, setInputNumber] = React.useState("");
    const [inputDesc, setInputDesc] = React.useState("");
    const [productsList, setProductsList] = React.useState([]);

    // <== REACT EFFECT ==> 
  React.useEffect(() => {
    fetch("http://localhost:5000/testLoad")
    .then(response => response.json())
    .then(response => setProductsList(response))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  // <== CALLBACK FUNCTIONS ==> 
    function handleUnitChange(event){
        setSelectUnit(event.target.value);
      };
  
      function handleAutoCompleteChange(value){
        if(value!=null){
        setProductCode(value.code);
        setAutoCompleteName(value.name);
        setSelectUnit(value.unit);
        setInputNumber("");
        setInputDesc("");
        }
      };
      const handleAdd = () => {
        if(autoCompleteName==="" || inputNumber==="" || Number(inputNumber)<=0 ){
            setDetectError(true);
          } else{
            props.onAdd(OrderPosition(productCode, autoCompleteName, selectUnit, inputNumber, inputDesc==="" ? "-" : inputDesc));
            setProductCode("");
            setAutoCompleteName("");
            setSelectUnit("");
            setInputNumber("");
            setInputDesc("");
            setDetectError(false);
            inputRef.current.focus();
          }
    };
// <== COMPONENT ==> 
    return(
        <Stack direction="row" spacing={2} alignContent={'center'}>
{/* // <== AUTOCOMPLETE - PRODUCT NAME ==>  */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(option) => option.name}
              key={tableData}
              onChange={(event, value) => handleAutoCompleteChange(value)}
              options={productsList}
              sx={{ minWidth: 300 }}
              renderInput={(params) => <TextField {...params} 
              label="Dodaj pozycje" 
              inputRef={inputRef}
              error={autoCompleteName.length === 0 && detectError}
              helperText={autoCompleteName.length === 0 && detectError ? "Wymagane pole" : ""}/>}
              />
{/* // <== SELECT - PRODUCT UNIT ==>  */}
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-helper-label">Jednostka</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectUnit}
                label="Jednostka"
                onChange={handleUnitChange}>
                <MenuItem value="">
                  <em>Brak</em>
                </MenuItem>
                <MenuItem value={"kg"}>Kg</MenuItem>
                <MenuItem value={"szt"}>Szt</MenuItem>
                <MenuItem value={"p"}>P</MenuItem>
              </Select>
            </FormControl>
{/* // <== INPUT - PRODUCT COUNT ==>  */}
            <TextField  
              id="outlined-number"
              label="Ilość"
              type="number"
              sx={{ minWidth: 150 }}
              value={inputNumber}
              onChange={(event, value) => setInputNumber(event.target.value)}
              InputLabelProps={{shrink: true,}}
              error={(inputNumber.length === 0 || Number(inputNumber) <= 0) && detectError }
              helperText={(inputNumber.length === 0 || Number(inputNumber) <= 0) && detectError  ? "Wymagane pole" : ""}
              />
{/* // <== SELECT - PRODUCT DESCRIPTION ==>  */}
              <Box component="form" sx={{'& > :not(style)': {minWidth: 150 },}} noValidate autoComplete="off">
              <TextField 
                id="outlined-basic" 
                label="Opis" 
                value={inputDesc} 
                variant="outlined" 
                onChange={(event, value) => setInputDesc(event.target.value)} 
                />
              </Box>
      <Button variant="contained" onClick={handleAdd}>Dodaj</Button>
  </Stack>
    );
};
export default SelectMenu;