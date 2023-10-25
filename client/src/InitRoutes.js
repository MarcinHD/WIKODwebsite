import React from "react";
import {Routes, Route } from "react-router-dom";
import Dashboard from "./DashboardTemp/Dashboard";
import App from "./App";

function InitRoutes(){
    return (
        <Routes>
            <Route path="/list" exact component={Dashboard} />
            <Route path="/About" component={App} />
        </Routes>
    );
}

export default InitRoutes;