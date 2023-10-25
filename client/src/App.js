import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<h1>Hello</h1>} />
                <Route path="dashboard-orders" element={<h1>World</h1>} />
            </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;