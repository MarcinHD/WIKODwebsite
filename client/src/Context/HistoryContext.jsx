import React from 'react';
import axios from "axios";

export const HistoryContext = React.createContext([]);

export const HistoryProvider = props => {
    const [history, setHistory] = React.useState(null);
    React.useEffect(() => {
      axios.get(`${process.env.REACT_APP_DB_GET_HISTORY_URL}`)
      .then((response) => {
        console.log("Context: Downloaded history");
        setHistory(response.data);
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
    return (
      <HistoryContext.Provider value={{history, setHistory}}>
          {props.children}
      </HistoryContext.Provider>
      );
}
