import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Outlets/Home";
import Orders from "./Outlets/Orders";
import Discounts from "./Outlets/Discounts";
import Products from "./Outlets/Products";
import History from "./Outlets/History";

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Home />}/>
                <Route path="dashboard-orders" element={<Orders />}/>
                <Route path="dashboard-discounts" element={<Discounts />}/>
                <Route path="dashboard-products" element={<Products />}/>
                <Route path="dashboard-history-last-month" element={<History />}/>
                <Route path="dashboard-history-ytd" element={<History />}/>
                <Route path="dashboard-history-all" element={<History />}/>
            </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;