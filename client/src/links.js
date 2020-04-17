import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link> <br />
                <Link to="/addmovies">Add Movies</Link><hr />
                <Link to="/searchmovies">Search Movies</Link>
            </div>
        );
    }
}


export default Navbar;