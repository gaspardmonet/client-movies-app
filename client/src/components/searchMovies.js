import * as React from 'react';
import Component from 'react';
import Axios from 'axios';

class SearchMovies extends React.Component {
  state = {
    genres: [],
    runtime: '',
  };
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
  changeDuration(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  searchMovieHandler(event) {
    event.preventDefault();
    const { genres, runtime } = this.state;
    console.log(`genre and runtime`, genres, runtime)
    Axios({
      url: '/searchmovies',
      method: 'POST',
      data: {
        runtime,
        genres,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }
  render() {
    var genres = [
      'Comedy',
      'Fantasy',
      'Crime',
      'Drama',
      'Music',
      'Adventure',
      'History',
      'Thriller',
      'Animation',
      'Family',
      'Mystery',
      'Biography',
      'Action',
      'Film-Noir',
      'Romance',
      'Sci-Fi',
      'War',
      'Western',
      'Horror',
      'Musical',
      'Sport',
    ];
    const checkBoxes = genres.map((elem) => {
      return (
        <label>
          {elem}
          <input
            type='checkbox'
            name={elem}
            onChange={this.inputCheckBoxHandler.bind(this)}
          />
        </label>
      );
    });
    return (
      <div>
        <form onSubmit={this.searchMovieHandler.bind(this)}>
          <h3> Please fill out the requirements for searching a movie</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {checkBoxes}
          </div>
          <br></br>
          <label>Runtime</label>
          <input
            type='number'
            name='runtime'
            placeholder='22'
            onChange={this.changeDuration.bind(this)}
          />
          <br />
          <br />

          <input type='submit' value='Search' />
        </form>
      </div>
    );
  };
}


export default SearchMovies;
