//home area
import * as React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1> Client Movies App</h1>
        <hr />
        <p>Please Select one option below</p>
        <div>
          <ul>
            <li>
              <Link to="/addmovies"> Add Movies </Link> <br />
            </li>
            <li>
              <Link to="/searchmovies"> Search Movies </Link> <br />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
