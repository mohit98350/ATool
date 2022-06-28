import React from "react";
import { useState,useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import LoginRedirect from "./components/Home/LoginRedirect";
import HomeView from "./components/Home/HomeView";
import PrivateRoute from "./components/PrivateRoute";
import Task_home from "./components/Task/Task_home";

const App = () => {
  
  if (!process.env.REACT_APP_BACKEND_URL) {
    return <p>
        Please specify your backend url with the <a href="https://create-react-app.dev/docs/adding-custom-environment-variables/" target="_blank" rel="noopener noreferrer">environment variable</a>:<br />
        <b>REACT_APP_BACKEND_URL</b>.<br />
        <br />
        For example launch this app with:<br />
        <b>REACT_APP_BACKEND_URL=http://localhost:1337 yarn start</b>
      </p>;
  }

  return (
    <Router>
    
        <Switch>
          <Route exact path="/connect/:providerName/redirect" component={LoginRedirect} />
           <Route   path="/" exact component={Home} />
          
          <PrivateRoute  path="/home" exact component={HomeView} />
          <PrivateRoute  path="/task_home/:id" exact component={Task_home} />
        </Switch>
      
    </Router>
  );
}

export default App;
