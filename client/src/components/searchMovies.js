import * as React from "react";
import Component from "react";
// import Axios from 'axios';
const axios = require("axios");

class SearchMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      runtime: "",
      dataFromServer: [],
    };

    this.formRef = React.createRef();
  }
  //for getting an array of genre
  inputCheckBoxHandler(event) {
    let genres = [...this.state.genres];
    if (event.target.checked) {
      genres.push(event.target.name);
      this.setState({ genres: genres });
    } else {
      const newArr = genres.filter((e) => e !== event.target.name);
      this.setState({ genres: newArr });
    }
  }
  //
  changeDuration(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //when submitting a form send params to path /searchmovies with get request
  searchMovieHandler(event) {
    event.preventDefault();
    const { genres, runtime } = this.state;
    console.log(`genre and runtime`, genres, runtime);
    axios
      .get("/searchmovies", {
        params: {
          genres: genres,
          runtime: runtime,
        },
      })
      .then((response) => {
        //receing data from server
        console.log([...response.data]);
        this.setState({
          dataFromServer: response.data, //fetch all the searched movies from backend and maintain its state
          genres: [],
          runtime: "",
        });
        //resetting a checkbox for unmark
        let currentForm = this.formRef.current;
        let checkBoxes = currentForm.querySelectorAll('input[type="checkbox"]');
        for (let i = 0; i < checkBoxes.length; i++) {
          checkBoxes[i].checked = false;
        }
      })
      //error handling if data not received from api
      .catch((err) => {
        console.error(`Error occured while getting movies from database`, err);
      });
  }
  render() {
    //to place predifined genre , genre has been defined
    var genres = [
      "Comedy",
      "Fantasy",
      "Crime",
      "Drama",
      "Music",
      "Adventure",
      "History",
      "Thriller",
      "Animation",
      "Family",
      "Mystery",
      "Biography",
      "Action",
      "Film-Noir",
      "Romance",
      "Sci-Fi",
      "War",
      "Western",
      "Horror",
      "Musical",
      "Sport",
    ];
    //genre select as an array with help of checbox
    const checkBoxes = genres.map((elem) => {
      return (
        <label>
          {elem}
          <input
            type="checkbox"
            name={elem}
            onChange={this.inputCheckBoxHandler.bind(this)}
          />
        </label>
      );
    });

    var listMovies =
      typeof this.state.dataFromServer === "string" ? (
        <li>{this.state.dataFromServer}</li>
      ) : (
        this.state.dataFromServer.map((value, index) => (
          <li key={index}>{value}</li>
        ))
      );
    return (
      <div>
        <form ref={this.formRef} onSubmit={this.searchMovieHandler.bind(this)}>
          <h3> Please fill out the requirements for searching a movie</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Genre</label>
            {checkBoxes}
          </div>
          <br></br>
          <label>Runtime</label>
          <input
            type="number"
            name="runtime"
            value={this.state.runtime}
            placeholder="22"
            onChange={this.changeDuration.bind(this)}
          />
          <br />
          <br />

          <input type="submit" value="Search" />
        </form>
        <div>
          <ul>{listMovies}</ul>
        </div>
      </div>
    );
  }
}

export default SearchMovies;
