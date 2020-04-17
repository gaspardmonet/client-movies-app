import * as React from "react";
import Component from "react";
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
        }
        // this.formHandle = this.formHandle.bind(this);
        // this.onChangeformHandle = this.onChangeformHandle.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    formHandle(event) {
        event.preventDefault();
        const { genre, title, year, runtime, director, actor, plot, posterURL } = this.state;
        const url = "/addmovies"

        axios({
            url: url,
            method: 'POST',
            data: { genre, title, year, runtime, director, actor, plot, posterURL }

        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
        // fetch('http://localhost:4000/addmovies', {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log(result)
        //     })
        // alert(`Movie has been added succesfully`);
        // console.log(event.target)
    }

    inputHandler(event) {
        console.log(event.target.value)
        // var target = event.target;
        this.setState({ [event.target.name]: event.target.value })
        // else
        //     prompt(`please insert number here`)

    }
    render() {
        // var genres = [
        //     "Comedy",
        //     "Fantasy",
        //     "Crime",
        //     "Drama",
        //     "Music",
        //     "Adventure",
        //     "History",
        //     "Thriller",
        //     "Animation",
        //     "Family",
        //     "Mystery",
        //     "Biography",
        //     "Action",
        //     "Film-Noir",
        //     "Romance",
        //     "Sci-Fi",
        //     "War",
        //     "Western",
        //     "Horror",
        //     "Musical",
        //     "Sport"
        // ];
        return (
            <div>
                <h3> Please fill out the requirements for adding a movie</h3>
                <form onSubmit={this.formHandle.bind(this)}  >
                    <label> Genre</label>
                    <div>
                        <label >Comedy
                        <input type="checkbox" name="genres" id="Comedy" onChange={this.inputHandler} value="comedy" />
                        </label><br />

                        <label >Fantasy
                        <input type="checkbox" name="genres" id="Fantasy" onChange={this.inputHandler} value="Fantasy" />
                        </label><br />

                        <label >Crime
                        <input type="checkbox" name="genres" id="Crime" onChange={this.inputHandler} value="Crime" />
                        </label><br />

                        <label >Drama
                        <input type="checkbox" name="genres" id="Drama" onChange={this.inputHandler} value="Drama" />
                        </label><br />

                        <label >Music
                        <input type="checkbox" name="genres" id="Music" onChange={this.inputHandler} value="Music" />
                        </label><br />

                        <label >Adventure
                        <input type="checkbox" name="genres" id="Adventure" onChange={this.inputHandler} value="Adventure" />
                        </label><br />

                        <label >History
                        <input type="checkbox" name="genres" id="History" onChange={this.inputHandler} value="History" />
                        </label><br />

                        <label >Thriller
                        <input type="checkbox" name="genres" id="Thriller" onChange={this.inputHandler} value="Thriller" />
                        </label><br />

                        <label >Animation
                        <input type="checkbox" name="genres" id="Animation" onChange={this.inputHandler} value="Animation" />
                        </label><br />

                        <label >Family
                        <input type="checkbox" name="genres" id="Family" onChange={this.inputHandler} value="Family" />
                        </label><br />

                        <label >Mystery
                        <input type="checkbox" name="genres" id="Mystery" onChange={this.inputHandler} value="Mystery" />
                        </label><br />

                        <label >Biography
                        <input type="checkbox" name="genres" id="Biography" onChange={this.inputHandler} value="Biography" />
                        </label><br />

                        <label >Action
                        <input type="checkbox" name="genres" id="Action" onChange={this.inputHandler} value="Action" />
                        </label><br />

                        <label >Film-Noir
                        <input type="checkbox" name="genres" id="Film-Noir" onChange={this.inputHandler} value="Film-Noir" />
                        </label><br />

                        <label >Romance
                        <input type="checkbox" name="genres" id="Romance" onChange={this.inputHandler} value="Romance" />
                        </label><br />

                        <label >Sci-Fi
                        <input type="checkbox" name="genres" id="Sci-Fi" onChange={this.inputHandler} value="Sci-Fi" />
                        </label><br />

                        <label >War
                        <input type="checkbox" name="genres" id="War" onChange={this.inputHandler} value="War" />
                        </label><br />

                        <label >Western
                        <input type="checkbox" name="genres" id="Western" onChange={this.inputHandler} value="Western" />
                        </label><br />

                        <label >Horror
                        <input type="checkbox" name="genres" id="Horror" onChange={this.inputHandler} value="Horror" />
                        </label><br />

                        <label >Musical
                        <input type="checkbox" name="genres" id="Musical" onChange={this.inputHandler} value="Musical" />
                        </label><br />

                        <label >Sport
                        <input type="checkbox" name="genres" id="Sport" onChange={this.inputHandler} value="Sport" />
                        </label><br />
                    </div>

                    {/* <select multiple={true} value={genres} onChange={this.inputHandler}>
                        <option value="sport">sport</option>
                        <option value="musical">musical</option>
                        <option value="war">war</option>
                    </select> */}

                    <label>Title
                    <input type="textarea" name="title " maxLength="255" onChange={this.inputHandler} required /><br />
                    </label>

                    <label>Year
                    <input type="number" name="year" placeholder='1920' onChange={this.inputHandler} reqiured /><br />
                    </label>

                    <label>Runtime
                    <input type="number" name="runtime" placeholder='22' onChange={this.inputHandler} />
                    </label>

                    <label>Director
                    <input type="text" maxLength="255" name="director" onChange={this.inputHandler} reqiured /><br />
                    </label>

                    <label>Actors
                    <input type="text" name="actor" onChange={this.inputHandler} reqiured /><br />
                    </label>

                    <label>Plot
                    <input type="text" name="plot" onChange={this.inputHandler} /><br />
                    </label>

                    <label>PosterURL
                    <input type="text" name="posterURL" onChange={this.inputHandler} /><br />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div >
        )
    }
}

export default AddMovies;