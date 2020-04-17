import * as React from "react";
import Component from "react";
import Navbar from "./links";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/home"
import AddMovies from "./components/addMovies";
const createBrowserHistory = require('history').createBrowserHistory;
// import SearchMovies from "./components/searchMovies";

const customHistory = createBrowserHistory();

class CustomRoutes extends React.Component {
    render() {
        return (
            <Router history={customHistory}>
                <div>
                    {/* <Home /> */}
                    <Route exact path="/" component={Home} />
                    <Route path="/addmovies" component={AddMovies} />
                    {/* <Route path="/searchmovies" component={SearchMovies} /> */}
                </div>
            </Router>
        )
    }
}

export default CustomRoutes