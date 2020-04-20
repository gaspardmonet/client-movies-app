const express = require("express"),
  app = express(),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  data = require("../data/db"),
  algo = require("./algo"),
  port = process.env.PORT || 4000,
  Genres = data.genres,
  cors = require("cors");

app.use(cors());
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

//to add movie properties will be received at path /addmovies
app.post("/addmovies", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  body = req.body;
  console.log(`req body is`, body);
  if (
    !body.genres ||
    !body.title ||
    !body.year ||
    !body.runtime ||
    !body.director
  ) {
    res.send(`Something is missing in genre title year runtime director`);
  }

  if (body.genres && body.title && body.year && body.runtime && body.director) {
    if (
      Array.isArray(body.genres) &&
      typeof body.title === "string" &&
      typeof body.director === "string" &&
      Number.isInteger(parseInt(body.runtime)) &&
      Number.isInteger(parseInt(body.year))
    ) {
      // console.log(`genre array`, Array.isArray(body.genres));
      // console.log(`title`, typeof body.title === "string");
      // console.log(`director`, typeof body.director === "string");
      // console.log(`runtime`, Number.isInteger(parseInt(body.runtime)));
      // console.log(`year`, Number.isInteger(parseInt(body.year)));

      const checkGenres = body.genres.some((r) => Genres.includes(r));
      console.log(`correct genre`, checkGenres);
      if (checkGenres) {
        // console.log(`here in after correct genre`);

        if (body.plot && body.actors && body.posterUrl) {
          console.log(`type of plot actors and posterUrl`, typeof body.plot);
          if (
            typeof body.plot === "string" &&
            typeof body.actors === "string" &&
            typeof body.posterUrl === "string"
          ) {
            addMovies(body, data);
            console.log(`body.plot && body.actors && body.posterUrl`);
          } else {
            console.log(`type of actors plot and posterUrl should be string`);
            res.send(`type of actors plot and posterUrl should be string`);
          }
        }
        if (body.plot && body.actors && !body.posterUrl) {
          if (
            typeof body.actors === "string" &&
            typeof body.plot === "string"
          ) {
            addMovies(body, data);
            console.log(`body.plot && body.actors && !body.posterUrl`);
          } else {
            console.log(`type of actors and plot  should be string`);
            res.send(`type of actors and plot  should be string`);
          }
        }
        if (body.posterUrl && body.plot && !body.actors) {
          if (
            typeof body.posterUrl === "string" &&
            typeof body.plot === "string"
          ) {
            addMovies(body, data);
            console.log(`body.posterUrl && body.plot && !body.actors`);
          } else {
            console.log(`type of posterUrl and plot  should be string`);
            res.send(`type of posterUrl and plot  should be string`);
          }
        }
        if (body.posterUrl && body.actors && !body.plot) {
          if (
            typeof body.posterUrl === "string" &&
            typeof body.actors === "string"
          ) {
            addMovies(body, data);
            console.log(`body.posterUrl && body.actors && !body.plot`);
          } else {
            console.log(`type of posterUrl and actors  should be string`);
            res.send(`type of posterUrl and actors  should be string`);
          }
        }
        if (body.posterUrl && !body.actors && !body.plot) {
          if (typeof body.posterUrl === "string") {
            addMovies(body, data);
            console.log(`body.posterUrl && !body.actors && !body.plot`);
          } else {
            console.log(`type of posterUrl  should be string`);
            res.send(`type of posterUrl  should be string`);
          }
        }
        if (body.actors && !body.posterUrl && !body.plot) {
          if (typeof body.actors === "string") {
            addMovies(body, data);
            console.log(`body.actors && !body.posterUrl && !body.plot`);
          } else {
            console.log(`type of actors  should be string`);
            res.send(`type of actors  should be string`);
          }
        }
        if (body.plot && !body.actors && !body.posterUrl) {
          if (typeof body.plot === "string") {
            addMovies(body, data);
            console.log(`body.plot && !body.actors && !body.posterUrl`);
          } else {
            console.log(`type of plot  should be string`);
            res.send(`type of plot  should be string`);
          }
        }
        if (!body.plot && !body.actors && !body.posterUrl) {
          // console.log(`type of plot is `, body.plot);
          addMovies(body, data);
          console.log(`!body.plot && !body.actors && !body.posterUrl`);
        }
      } else {
        console.log(`Please use predefined genre`);
        res.send(`Please use predefined genre`);
      }
    } else {
      console.log(
        `Please ensure that the type of genre is array and type of title director is string and type of runtime and year is number `
      );
      res.send(
        `Please ensure that the type of genre is array and type of title director is string and type of runtime and year is number `
      );
    }
  }
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
  function addMovies(body, data) {
    if (!body.actors) {
      body.actors = "";
    }
    if (!body.posterUrl) {
      body.posterUrl = "";
    }
    if (!body.plot) {
      body.plot = "";
    }
    // get biggest id in db to append next movie with following id

    var Id = getNextId(data.movies);
    Id++;
    console.log(`id is `, Id);
    body.id = Id;
    // console.log(`body.id`, body.id);
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
        "posterUrl",
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
