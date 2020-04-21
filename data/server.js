const express = require("express"),
  app = express(),
  path = require("path"),
  fs = require("fs"),
  jsonQuery = require("json-query"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 4000;
var data = require("../data/db"),
  cors = require("cors"),
  movies = data.movies;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

//to add movie properties will be received at path /addmovies
app.post("/addmovies", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset = utf - 8");
  body = req.body;
  body.genres.sort(); //sorting the array of genre in alphabetical order to make proper use of search algo
  console.log(body);
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
        // res.send(`Data added successfully`);
      });
    }
  });
});

//receiving filter for searching movies at path /searchmovies
app.post("/searchmovies", (req, res) => {
  res.statusCode = 200;
  //   res.setHeader("Content-Type ", "text/plain; charset = utf-8");
  console.log(req.body.data);
  //getting filters
  let Runtime = req.body.data.runtime,
    genres = req.body.data.genres;
  //   let genres = new Array();
  //   genres = Genres.split(",");
  //   console.log(genres);

  //to make pairs of 2 genre from given genre more than 2
  function pairwise(list) {
    if (list.length < 2) {
      return {};
    }
    var first = list[0],
      rest = list.slice(1),
      pairs = rest.map(function (x) {
        return [first, x];
      });
    return pairs.concat(pairwise(rest));
  }

  //search algo for both genre and runtime provided

  //search for no genre provided return single movie within duration runtime-10 and runtime+10
  function runtimeSearchAlgo(Runtime) {
    console.log(`runtime Search Algo`);
    const duration = (d) =>
      d.runtime > Runtime - 10 && d.runtime < Runtime + 10;
    const Duration = movies.filter(duration);
    return Duration[Math.floor(Math.random() * Duration.length)].title;
  }

  //no params provided return a single random
  function noParamsSearchAlgo() {
    console.log(`noParamsSearchAlgo`);
    return movies[Math.floor(Math.random() * movies.length)].title;
  }

  //   returning searched movvies
  if (Runtime !== "" && genres.length !== 0) {
    let movies = genreAndRuntimeSearchAlgo(genres, Runtime);
    console.log(`movies are`, movies);
    res.send(movies);
  } else if (Runtime === "" && genres.length !== 0) {
    let movies = genreSearchAlgo(genres);
    console.log(`movies are`, movies);
    res.send(movies);
  } else if (Runtime !== "" && genres.length === 0) {
    let movies = runtimeSearchAlgo(Runtime);
    console.log(`movies are`, movies);
    res.send(movies);
  } else if (Runtime === "" && genres.length === 0) {
    let movies = noParamsSearchAlgo();
    console.log(`movies are`, movies);
    res.send(movies);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

// module.exports = app;
