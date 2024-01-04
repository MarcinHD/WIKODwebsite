import React from 'react';

export const CurrentPageContext = React.createContext();

export const CurrentPageProvider = props => {
    const [page, setPage] = React.useState(0);

    const pageName = [
        "WIKOD - Strona główna",
        "WIKOD - Zamówienia",
        "WIKOD - Promocje",
        "WIKOD - Asortyment",
        "WIKOD - Historia"
    ];

    return (
      <CurrentPageContext.Provider value={{page,setPage,pageName}}>
          {props.children}
      </CurrentPageContext.Provider>
      );
}