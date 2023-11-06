import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataGrid } from '@mui/x-data-grid';


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

function TestInfiniteScroll() {
  const [items, setItems] = React.useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };

      const columns = [
        { field: 'id', headerName: 'Lp', type: 'number', width: 70 },
        { field: 'code', headerName: 'Kod', width: 150 },
        { field: 'name', headerName: 'Nazwa', width: 300 },
        { field: 'unit', headerName: 'Jedn.', sortable: false, width: 70 },
        { field: 'price', headerName: 'Cena', type: 'number', width: 90},
      ];
      const rows = [
          {id:1,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
          {id:2,code:"70-05-0042",name:"BALERON PARZONY",unit:"szt",price:15.9},
          {id:3,code:"70-01-0709",name:"BAMBERSKA",unit:"p",price:16.6},
          {id:4,code:"70-01-0071",name:"BIAŁA PARZONA",unit:"p",price:16.1},
          {id:5,code:"70-01-0004",name:"BIAŁA SUROWA",unit:"p",price:15.6},
          {id:6,code:"70-08-0701",name:"BIGOS WYBOROWY",unit:"szt",price:13.5},
          {id:7,code:"10-02-0300",name:"BIODRÓWKA",unit:"szt",price:10.5},
          {id:8,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
          {id:9,code:"70-05-0042",name:"BALERON PARZONY",unit:"szt",price:15.9},
          {id:10,code:"70-01-0709",name:"BAMBERSKA",unit:"p",price:16.6},
          {id:11,code:"70-01-0071",name:"BIAŁA PARZONA",unit:"p",price:16.1},
          {id:12,code:"70-01-0004",name:"BIAŁA SUROWA",unit:"p",price:15.6},
          {id:13,code:"70-08-0701",name:"BIGOS WYBOROWY",unit:"szt",price:13.5},
          {id:14,code:"10-02-0300",name:"BIODRÓWKA",unit:"szt",price:10.5},
          {id:15,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
          {id:1,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
          {id:2,code:"70-05-0042",name:"BALERON PARZONY",unit:"szt",price:15.9},
          {id:3,code:"70-01-0709",name:"BAMBERSKA",unit:"p",price:16.6},
          {id:4,code:"70-01-0071",name:"BIAŁA PARZONA",unit:"p",price:16.1},
          {id:5,code:"70-01-0004",name:"BIAŁA SUROWA",unit:"p",price:15.6},
          {id:6,code:"70-08-0701",name:"BIGOS WYBOROWY",unit:"szt",price:13.5},
          {id:7,code:"10-02-0300",name:"BIODRÓWKA",unit:"szt",price:10.5},
          {id:8,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5},
          {id:9,code:"70-05-0042",name:"BALERON PARZONY",unit:"szt",price:15.9},
          {id:10,code:"70-01-0709",name:"BAMBERSKA",unit:"p",price:16.6},
          {id:11,code:"70-01-0071",name:"BIAŁA PARZONA",unit:"p",price:16.1},
          {id:12,code:"70-01-0004",name:"BIAŁA SUROWA",unit:"p",price:15.6},
          {id:13,code:"70-08-0701",name:"BIGOS WYBOROWY",unit:"szt",price:13.5},
          {id:14,code:"10-02-0300",name:"BIODRÓWKA",unit:"szt",price:10.5},
          {id:15,code:"10-02-0395",name:"BABUNI MIĘSO",unit:"szt",price:13.5}
      ];
    return (
        <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        height={300}
        loader={<h4>Loading...</h4>}>
        {items.map((i, index) => (
            <h3>Hello {index}</h3>
          ))}
        </InfiniteScroll>
    );
  };

  export default TestInfiniteScroll;


