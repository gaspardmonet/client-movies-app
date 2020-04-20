const jsonQuery = require("json-query");
const data = require("../data/db");
const movies = data.movies;

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

module.exports = {
  genreAndRuntimeSearchAlgo: function genreAndRuntimeSearchAlgo(
    genre,
    runtime
  ) {
    console.log(`genre And Runtime Search Algo`);
    genre.sort(); //sorting genres in alphabetically order to make search powerful
    var searchedMovie = []; //Array of Searched movie
    if (genre.length > 2) {
      //This will search exact match condition i.e genre > 2 and runtime between runtime-10 and runtime+10
      searchedMovie.push(
        jsonQuery(
          `movies[**][*genres = ${genre} & (runtime > ${runtime}-10 & runtime < 10) ].title`,
          {
            data: data,
          }
        ).value
      );
      //now search for pair of 2
      var result = pairwise(genre);
      result.map((a) => {
        searchedMovie.push(
          jsonQuery(
            `movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`,
            {
              data: data,
            }
          ).value
        );
      });

      // this will search for single genre filter movie
      genre.map((a) => {
        searchedMovie.push(
          jsonQuery(
            `movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`,
            {
              data: data,
            }
          ).value
        );
      });
      return searchedMovie.flat();
    }
    //search  for 2 genre provided
    else if (genre.length === 2) {
      //   console.log(`Running for lenght === 2`);
      genre.map((a) => {
        searchedMovie.push(
          jsonQuery(
            `movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`,
            {
              data: data,
            }
          ).value
        );
      });
      return searchedMovie.flat();
    }
    //search for 1 genre provided
    else if (genre.length === 1) {
      //   console.log(`Running for lenght === 1`);
      searchedMovie.push(
        jsonQuery(
          `movies[**][*genres = ${genre} & (runtime > ${runtime}-10 & runtime < 10) ].title`,
          {
            data: data,
          }
        ).value
      );
      return searchedMovie.flat();
    } else {
      console.log(`No genre and runtime provided`);
    }
  },
  //search algo got provided genre with no runtime given
  genreSearchAlgo: function genreSearchAlgo(genre) {
    console.log(`genre Search Algo`);
    genre.sort(); //sorting genres in alphabetically order to make search powerful
    var searchedMovie = []; //Array of Searched movie
    if (genre.length > 2) {
      //search exact movie genre provided
      searchedMovie.push(
        jsonQuery(`movies[**][*genres = ${genre} ].title`, {
          data: data,
        }).value
      );
      //search for 2 genre in pair
      var result = pairwise(genre);
      result.map((a) => {
        searchedMovie.push(
          jsonQuery(`movies[**][*genres = ${a} ].title`, {
            data: data,
          }).value
        );
      });
      //search for single genre filter
      genre.map((a) => {
        searchedMovie.push(
          jsonQuery(`movies[**][*genres = ${a} ].title`, {
            data: data,
          }).value
        );
      });
      return searchedMovie.flat();
    } else if (genre.length === 2) {
      //search for two genre provided
      //   console.log(`Running for lenght === 2`);
      genre.map((a) => {
        searchedMovie.push(
          jsonQuery(`movies[**][*genres = ${a} ].title`, {
            data: data,
          }).value
        );
      });
      return searchedMovie.flat();
    } else if (genre.length === 1) {
      //search for single genre provided
      //   console.log(`Running for lenght === 1`);
      searchedMovie.push(
        jsonQuery(`movies[**][*genres = ${genre} ].title`, {
          data: data,
        }).value
      );
      return searchedMovie.flat();
    } //error handling
    else {
      console.log(`No genre provided`);
    }
  },
  //search for no genre provided return single movie within duration runtime-10 and runtime+10
  runtimeSearchAlgo: function runtimeSearchAlgo(Runtime) {
    console.log(`runtime Search Algo`);
    const duration = (d) =>
      d.runtime > Runtime - 10 && d.runtime < Runtime + 10;
    const Duration = movies.filter(duration);
    return [Duration[Math.floor(Math.random() * Duration.length)].title];
  },
  //no params provided return a single random
  noParamsSearchAlgo: function noParamsSearchAlgo() {
    console.log(`noParamsSearchAlgo`);
    return [movies[Math.floor(Math.random() * movies.length)].title];
  },
};
