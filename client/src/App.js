import * as React from 'react';
import Layout from "./Layout/Layout";
import { ProductsProvider } from "./Context/ProductsContextFile";
import { HistoryProvider } from "./Context/HistoryContext";
import { UserProvider } from "./Context/UserContext";
import { CustomThemeProvider } from './Context/MUIThemeContext';


function App(){

    return (
        <CustomThemeProvider>
        <UserProvider>
        <ProductsProvider>
        <HistoryProvider>
        <Layout/>
        </HistoryProvider> 
        </ProductsProvider> 
        </UserProvider>
        </CustomThemeProvider>
    );
}

export default App;