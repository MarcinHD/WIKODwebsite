import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Orders(){

    const [value, setValue] = React.useState(dayjs('2022-04-17'));


    return (
        <React.Fragment>
       <Grid item xs={12}>
           <Paper
             sx={{
               p: 2,
               display: 'flex',
               flexDirection: 'column',
               height: '80vh',
             }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <DemoItem label="Uncontrolled calendar">
                    <DateCalendar defaultValue={dayjs('2022-04-17')} />
                    </DemoItem>
                    <DemoItem label="Controlled calendar">
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoItem>
                </DemoContainer>
                </LocalizationProvider>
           </Paper>
       </Grid>
       </React.Fragment>
    );
}

export default Orders;