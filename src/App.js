import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import LoginRedirect from "./components/Home/LoginRedirect";
import HomeView from "./components/Home/HomeView";

const App = () => {
  const backendUrl = 'http://localhost:1337';
  if (!backendUrl) {
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
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={HomeView} />
        </Switch>
    </Router>
  );
}

export default App;
