import * as React from 'react';
import Component from 'react';
const axios = require('axios');

class AddMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      title: '',
      year: '',
      runtime: '',
      director: '',
      actor: '',
      plot: '',
      posterURL: '',
    };
    // this.onChangeformHandle = this.onChangeformHandle.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  formHandle(event) {
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
    const url = '/addmovies';
    if (genres.length < 1) {
      alert('Genre should be greater than 1  ');
    } else {
      //console.log(this.state);
      axios({
        url: url,
        method: 'POST',
        data: {
          genres,
          title,
          year,
          runtime,
          director,
          actor,
          plot,
          posterURL,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }


  }

  inputHandler(event) {
    console.log(event.target.value);
    // var target = event.target;
    this.setState({ [event.target.name]: event.target.value });
  }
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

    return (
      <div>
        <h3> Please fill out the requirements for adding a movie</h3>
        <form onSubmit={this.formHandle.bind(this)}>
          <label> Genre</label>
          <div>
            <label>
              Comedy
              <input
                type='checkbox'
                name='Comedy'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Fantasy
              <input
                type='checkbox'
                name='Fantasy'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Crime
              <input
                type='checkbox'
                name='Crime'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Drama
              <input
                type='checkbox'
                name='Drama'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Music
              <input
                type='checkbox'
                name='Music'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Adventure
              <input
                type='checkbox'
                name='Adventure'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              History
              <input
                type='checkbox'
                name='History'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Thriller
              <input
                type='checkbox'
                name='Thriller'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Animation
              <input
                type='checkbox'
                name='Animation'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Family
              <input
                type='checkbox'
                name='Family'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Mystery
              <input
                type='checkbox'
                name='Mystery'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Biography
              <input
                type='checkbox'
                name='Biography'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Action
              <input
                type='checkbox'
                name='Action'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Film-Noir
              <input
                type='checkbox'
                name='Film-Noir'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Romance
              <input
                type='checkbox'
                name='Romance'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Sci-Fi
              <input
                type='checkbox'
                name='Sci-Fi'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              War
              <input
                type='checkbox'
                name='War'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Western
              <input
                type='checkbox'
                name='Western'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Horror
              <input
                type='checkbox'
                name='Horror'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Musical
              <input
                type='checkbox'
                name='Musical'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />

            <label>
              Sport
              <input
                type='checkbox'
                name='Sport'
                onChange={this.inputCheckBoxHandler.bind(this)}
              />
            </label>
            <br />
          </div>

          {/* <select multiple={true} value={genres} onChange={this.inputCheckBoxHandler.bind(this)}>
                        <option value="sport">sport</option>
                        <option value="musical">musical</option>
                        <option value="war">war</option>
                    </select> */}

          <label>
            Title
            <input
              type='textarea'
              name='title'
              maxLength='255'
              onChange={this.inputHandler}
              required
            />
            <br />
          </label>

          <label>
            Year
            <input
              type='number'
              name='year'
              placeholder='1920'
              onChange={this.inputHandler}
              reqiured
            />
            <br />
          </label>

          <label>
            Runtime
            <input
              type='number'
              name='runtime'
              placeholder='22'
              onChange={this.inputHandler}
              required
            />
          </label>
          <br />
          <label>
            Director
            <input
              type='text'
              maxLength='255'
              name='director'
              onChange={this.inputHandler}
              reqiured
            />
            <br />
          </label>

          <label>
            Actors
            <input type='text' name='actor' onChange={this.inputHandler} />
            <br />
          </label>

          <label>
            Plot
            <input type='text' name='plot' onChange={this.inputHandler} />
            <br />
          </label>

          <label>
            PosterURL
            <input type='url' name='posterURL' onChange={this.inputHandler} />
            <br />
          </label>

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default AddMovies;
