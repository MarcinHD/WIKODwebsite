import * as React from 'react';
import axios from "axios";
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './partials/history/Row';

function History(){
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get("http://localhost:5000/history")
      .then((response) => {
        console.log("Downloaded");
        setPost(response.data);
        console.log(response.data);
      })
      .catch((err)=>{
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
    }, []);

      if (!post) return (
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );

    return (
        <div>
        <h1>Historia</h1>
        <div style={{ height: '70vh', width: '120%' }}>
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Lp</TableCell>
              <TableCell align="left">Termin dostawy</TableCell>
              <TableCell align="left">Lokalizacja</TableCell>
              <TableCell align="right">Płatność</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.length===0? "":post.map((row, index) => (
              <Row 
              row={row} 
              indexRow={index} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    );
}

export default History;