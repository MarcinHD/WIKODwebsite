import React from "react";
import Layout from "./Layout/Layout";
import { ProductsProvider } from "./Context/ProductsContextFile";
import { HistoryProvider } from "./Context/HistoryContext";
import { UserProvider } from "./Context/UserContext";

function App(){

    return (
        <UserProvider>
        <ProductsProvider>
        <HistoryProvider>
            <Layout/>
        </HistoryProvider> 
        </ProductsProvider> 
        </UserProvider>
    );
}

export default App;