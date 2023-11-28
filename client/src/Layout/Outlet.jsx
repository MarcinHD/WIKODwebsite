import * as React from 'react';
import Home from '../Outlets/Home';
import Orders from '../Outlets/Orders';
import Products from '../Outlets/Products';
import History from '../Outlets/History';
import Discounts from '../Outlets/Discounts';
import { CurrentPageContext } from '../Context/CurrentPage';



function Outlet(){
    const {page, setPage, pageName} = React.useContext(CurrentPageContext);

    function switchPage(){
        switch(page){
          case 0:
            return <Home />
          case 1:
            return <Orders />;
          case 2:
            return <Discounts />;
          case 3:
            return <Products />;
          case 4:
            return <History />;
          default:
            return <Home/>
        }
    }

    return (
        <React.Fragment>
            {switchPage()}
        </React.Fragment>
    );
};

export default Outlet;