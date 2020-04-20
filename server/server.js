const express = require("express"),
  app = express(),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  data = require("../data/db"),
  algo = require("./algo"),
  port = process.env.PORT || 4000;
cors = require("cors");

app.use(cors());
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

//to add movie properties will be received at path /addmovies
app.post("/addmovies", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  body = req.body;
  console.log(body);
  if (body.genres && body.title && body.year && body.runtime && body.director) {
    // get biggest id in db to append next movie with following id
    function getNextId(obj) {
      return (
        Math.max.apply(
          Math,
          obj.map(function (o) {
            return o.id;
          })
        ) + 1
      );
    }
    var Id = getNextId(data.movies);
    console.log(`id is `, Id);
    body.id = Id;
    body.genres.sort(); //sorting to make search
    //rearranging the order of movie field to be identical with database fields order
    var movie = JSON.parse(
      JSON.stringify(body, [
        "id",
        "title",
        "year",
        "runtime",
        "genres",
        "director",
        "actors",
        "plot",
        "posterURL",
      ])
    );
    console.log(movie);
    //appending or adding a new movie to db
    fs.readFile("../data/db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(`Error occured`, err);
      } else {
        obj = JSON.parse(data);
        obj.movies.push(movie);
        json = JSON.stringify(obj);
        fs.writeFile("../data/db.json", json, "utf8", () => {
          console.log(`data pushed`);
          res.send(`Data added successfully`);
        });
      }
    });
  } else {
    res.send(`Something is missing in genre title year runtime director`);
  }
});

//receiving filter for searching movies at path /searchmovies
app.get("/searchmovies", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  console.log(req.query);
  if (!req.query.genres && !req.query.runtime) {
    var Runtime = "";
    var genres = [];
    searchMovieAlgo(genres, Runtime);
  } else if (!req.query.genres) {
    var Runtime = req.query.runtime;
    var genres = [];
    searchMovieAlgo(genres, Runtime);
  } else {
    //getting filters
    var Runtime = req.query.runtime,
      genres = req.query.genres;
    searchMovieAlgo(genres, Runtime);
  }

  function searchMovieAlgo(genres, Runtime) {
    //   returning searched movvies
    if (Runtime !== "" && genres.length !== 0) {
      let movies = algo.genreAndRuntimeSearchAlgo(genres, Runtime);
      console.log(`movies are`, movies);
      res.send(movies);
    } else if (Runtime === "" && genres.length !== 0) {
      let movies = algo.genreSearchAlgo(genres);
      console.log(`movies are`, movies);
      res.send(movies);
    } else if (Runtime !== "" && genres.length === 0) {
      let movies = algo.runtimeSearchAlgo(Runtime);
      console.log(`movies are`, movies);
      res.send(movies);
    } else if (Runtime === "" && genres.length === 0) {
      let movies = algo.noParamsSearchAlgo();
      console.log(`movies are`, movies);
      res.send(movies);
    }
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
