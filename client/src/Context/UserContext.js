import React from 'react';
import axios from "axios";

export const UserContext = React.createContext([]);

export const UserProvider = props => {
    const [userData,setUserData] = React.useState(null);
    React.useEffect(() => {
      axios.get(`${process.env.REACT_APP_DB_GET_USERDATA_URL}`)
      .then((response) => {
        console.log("Context: Downloaded userData");
        console.log("Object: \n" + JSON.stringify(response));
        setUserData(response.data[0]);
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
      <UserContext.Provider value={{userData, setUserData}}>
          {props.children}
      </UserContext.Provider>
      );
}