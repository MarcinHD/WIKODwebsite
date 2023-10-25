import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import InitRoutes from "./InitRoutes";
import App from "./App";
import Dashboard from "./DashboardTemp/Dashboard";

ReactDOM.render(    
    <BrowserRouter>
        <InitRoutes />
    </BrowserRouter>,
    document.getElementById("root"));