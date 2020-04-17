import React from 'react';
import ReactDOM from 'react-dom';
import CustomRoutes from "./routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

ReactDOM.render(
  <React.StrictMode>
    <CustomRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

