import React from 'react';
import NavBar from "./navBar.js";
import ServerList from "./serverList.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
require('dotenv').config();

function App() {
    const token=""
    const apiHost = process.env.REACT_APP_APIHOST;
    console.log("apihost=" + apiHost);
  return (
      <MuiThemeProvider >
        <CssBaseline />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div>
          <NavBar />
          <ServerList region="us-east-1" token={token} apiHost={apiHost}/>
          <ServerList region="us-east-2" token={token} apiHost={apiHost}/>

          <ServerList region="us-west-1" token={token} apiHost={apiHost}/>
          <ServerList region="us-west-2" token={token} apiHost={apiHost}/>
          <ServerList region="ap-east-1" token={token} apiHost={apiHost}/>
          <ServerList region="ap-south-1" token={token} apiHost={apiHost}/>
          <ServerList region="ap-northeast-3" token={token} apiHost={apiHost}/>
          <ServerList region="ap-northeast-2" token={token} apiHost={apiHost}/>
          <ServerList region="ap-southeast-1" token={token} apiHost={apiHost}/>
          <ServerList region="ap-southeast-2" token={token} apiHost={apiHost}/>

          <ServerList region="sa-east-1" token={token} apiHost={apiHost}/>
        </div>

      </MuiThemeProvider>
  );
}

export default App;
