import React from 'react';
import axios from "axios";

export const UserContext = React.createContext([]);

export const UserProvider = props => {
    const [userData,setUserData] = React.useState(null);

    // React.useEffect(() => {
    //   axios.get("http://localhost:5000/history")
    //   .then((response) => {
    //     console.log("Downloaded");
    //     setHistory(response.data);
    //   })
    //   .catch((err)=>{
    //     if (err.response) {
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //     } else if (err.request) {
    //       console.log(err.request);
    //     } else {
    //       console.log('Error', err.message);
    //     }
    //   });
    // }, []);
    return (
      <UserContext.Provider value={userData}>
          {props.children}
      </UserContext.Provider>
      );
}