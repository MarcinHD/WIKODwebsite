import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import Note from "./partials/Note";
import CreateArea from './partials/CreateArea';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Orders(){

    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const [notes, setNotes] = React.useState([]);

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
               height: '80vh',
             }}>
                   <CreateArea onAdd={addNote} />
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
                    })}
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

export default Orders;