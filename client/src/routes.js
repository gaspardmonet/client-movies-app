import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import AddMovies from "./components/addMovies";
import SearchMovies from "./components/searchMovies";

const createBrowserHistory = require("history").createBrowserHistory;
const customHistory = createBrowserHistory();

class CustomRoutes extends React.Component {
  render() {
    return (
      <Router history={customHistory}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/addmovies" component={AddMovies} />
          <Route path="/searchmovies" component={SearchMovies} />
        </div>
      </Router>
    );
  }
}

export default CustomRoutes;
