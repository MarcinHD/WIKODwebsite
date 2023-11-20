import React from "react";
import Layout from "./Layout/Layout";
import { ProductsProvider } from "./Context/ProductsContextFile";

function App(){

    return (
        <ProductsProvider>
            <Layout/>
        </ProductsProvider>
    );
}

export default App;