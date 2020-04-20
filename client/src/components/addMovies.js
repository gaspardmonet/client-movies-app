// Add movie form

import * as React from "react";
const axios = require("axios");

class AddMovies extends React.Component {
  constructor(props) {
    super(props);
    //movie properties
    this.state = {
      genres: [],
      title: "",
      year: "",
      runtime: "",
      director: "",
      actor: "",
      plot: "",
      posterURL: "",
    };
    this.formRef = React.createRef();
  }
  //on submitting form this function calls and post all properies of a new movie to backend express api
  addMovieHandler(event) {
    event.preventDefault();
    const {
      genres,
      title,
      year,
      runtime,
      director,
      actor,
      plot,
      posterURL,
    } = this.state;
    const url = "/addmovies";
    if (genres.length < 1) {
      alert("Genre should be greater than 1  ");
    } else {
      //posting data to express api with axios on path /addmovies
      axios
        .post(url, {
          genres,
          title,
          year,
          runtime,
          director,
          actor,
          plot,
          posterURL,
        })
        .then((response) => {
          console.log(response.data);
          this.setState({
            genres: [],
            title: "",
            year: "",
            runtime: "",
            director: "",
            actor: "",
            plot: "",
            posterURL: "",
          });
          alert(`Movie has been successfully added`);
          //resetting a checkbox for unmark
          let currentForm = this.formRef.current;
          let checkBoxes = currentForm.querySelectorAll(
            'input[type="checkbox"]'
          );
          for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // for taking fields other than genre
  inputHandler(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  // for taking genre
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
    const checkBoxes = genres.map((value) => {
      return (
        <label>
          {value}
          <input
            type="checkbox"
            name={value}
            onChange={this.inputCheckBoxHandler.bind(this)}
          />
        </label>
      );
    });

    return (
      <div>
        <h3> Please fill out the requirements for adding a movie</h3>
        <form onSubmit={this.addMovieHandler.bind(this)} ref={this.formRef}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Genre</label>
            {checkBoxes}
          </div>
          <label>
            Title
            <input
              type="textarea"
              name="title"
              maxLength="255"
              value={this.state.title}
              onChange={this.inputHandler.bind(this)}
              required
            />
            <br />
          </label>
          <label>
            Year
            <input
              type="number"
              name="year"
              placeholder="1920"
              value={this.state.year}
              onChange={this.inputHandler.bind(this)}
              required
            />
            <br />
          </label>

          <label>
            Runtime
            <input
              type="number"
              name="runtime"
              placeholder="22"
              value={this.state.runtime}
              onChange={this.inputHandler.bind(this)}
              required
            />
          </label>
          <br />
          <label>
            Director
            <input
              type="text"
              maxLength="255"
              name="director"
              value={this.state.director}
              onChange={this.inputHandler.bind(this)}
              required
            />
            <br />
          </label>

          <label>
            Actors
            <input
              type="text"
              name="actor"
              value={this.state.actor}
              onChange={this.inputHandler.bind(this)}
            />
            <br />
          </label>

          <label>
            Plot
            <input
              type="text"
              name="plot"
              value={this.state.value}
              onChange={this.inputHandler.bind(this)}
            />
            <br />
          </label>

          <label>
            PosterURL
            <input
              type="url"
              name="posterURL"
              value={this.state.posterURL}
              onChange={this.inputHandler.bind(this)}
            />
            <br />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddMovies;
