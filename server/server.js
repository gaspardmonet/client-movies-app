const express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    jsonQuery = require('json-query'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 4000;
var data = require('../data/db');
var cors = require('cors');
var movies = data.movies;


app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())


app.post('/addmovies', (req, res) => {
    res.statusCode = 200;
    body = req.body
    body.genres.sort();
    console.log(body)
    function getNextId(obj) {
        return (Math.max.apply(Math, obj.map(function (o) {
            return o.id;
        })) + 1);
    }
    var Id = getNextId(data.movies)
    console.log(`id is `, Id);
    body.id = Id
    var movie = JSON.parse(JSON.stringify(body, ['id', 'title', 'year', 'runtime', 'genres', 'director', 'actors', 'plot', 'posterURL']))
    console.log(movie)

    fs.readFile('../data/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(`Error occured`, err)
        } else {
            obj = JSON.parse(data);
            obj.movies.push(movie)
            json = JSON.stringify(obj);
            fs.writeFile('../data/db.json', json, 'utf8', () => console.log(`data pushed`))
        }
    })

})


app.post('/searchmovies', (req, res) => {
    res.statusCode = 200;
    // res.setHeader("Content-Type ", "application/json");
    console.log(req.body);
    let Runtime = req.body.runtime,
        genres = req.body.genres;


    function pairwise(list) {
        if (list.length < 2) { return {} };
        var first = list[0],
            rest = list.slice(1),
            pairs = rest.map(function (x) { return [first, x]; })
        return pairs.concat(pairwise(rest));
    }

    function genreAndRuntimeSearchAlgo(genre, runtime) {
        console.log(`genreAndRuntimeSearchAlgo`)
        genre.sort();
        var genreTopush = [];
        // console.log(`length is `, genre.length)
        if (genre.length > 2) {
            // console.log(`Running for lenght > 2`)

            // console.log(`for`, genre);
            genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                data: data,
            }).value)

            var result = pairwise(genre);
            // console.log(result);
            result.map(a => {
                // console.log(`for `, b)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                    data: data,
                }).value)

            })
            genre.map(a => {
                // console.log(`for`, a)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                    data: data,
                }).value)
            })
            // console.log(`genreToPush is `, genreTopush)
            // genreTopush.filter((value, index) => value = ! null)
            // var combimeArray = []
            // genreTopush.map((value, index) => {
            //     combimeArray = [...value, ...genreTopush[index + 1]]
            // })
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else if (genre.length === 2) {
            console.log(`Running for lenght === 2`)
            genre.map(a => {
                // console.log(`for`, a)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                    data: data,
                }).value)
            })
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else if (genre.length === 1) {
            console.log(`Running for lenght === 1`)
            genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                data: data,
            }).value)
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else {
            console.log(`No genre and runtime provided`)
        }
    }

    function genreSearchAlgo(genre) {
        console.log(`genreSearchAlgo`)
        genre.sort();
        var genreTopush = [];
        console.log(`genre length is `, genre.length)
        if (genre.length > 2) {
            console.log(`Running for lenght > 2`)

            // console.log(`for`, genre);
            genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} ].title`, {
                data: data,
            }).value)

            var result = pairwise(genre);
            // console.log(result);
            result.map(a => {
                // console.log(`for `, b)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} ].title`, {
                    data: data,
                }).value)

            })
            genre.map(a => {
                // console.log(`for`, a)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} ].title`, {
                    data: data,
                }).value)
            })
            // console.log(`genreToPush is `, genreTopush)
            // genreTopush.filter((value, index) => value = ! null)
            // var combimeArray = []
            // genreTopush.map((value, index) => {
            //     combimeArray = [...value, ...genreTopush[index + 1]]
            // })
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else if (genre.length === 2) {
            console.log(`Running for lenght === 2`)
            genre.map(a => {
                // console.log(`for`, a)
                genreTopush.push(jsonQuery(`movies[**][*genres = ${a} ].title`, {
                    data: data,
                }).value)
            })
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else if (genre.length === 1) {
            console.log(`Running for lenght === 1`)
            genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} ].title`, {
                data: data,
            }).value)
            // console.log(`genreToPush is `, genreTopush)
            return genreTopush;
        }
        else {
            console.log(`No genre provided`)
        }
    }

    function runtimeSearchAlgo(Runtime) {
        console.log(`runtimeSearchAlgo`)
        const duration = d => d.runtime > Runtime - 10 && d.runtime < Runtime + 10;
        const Duration = movies.filter(duration);
        return Duration[Math.floor(Math.random() * Duration.length)].title
    }

    function noParamsSearchAlgo() {
        console.log(`noParamsSearchAlgo`)
        return movies[Math.floor(Math.random() * movies)]
    }

    if (Runtime !== '' && genres !== []) {
        let movies = genreAndRuntimeSearchAlgo(genres, Runtime)
        console.log(`movies are`, movies)
        res.send(movies)

    }
    else if (Runtime === '' && genres !== []) {
        let movies = genreSearchAlgo(genres)
        console.log(`movies are`, movies);
        res.send(movies)
    }
    else if (Runtime !== '' && genres === []) {
        let movies = runtimeSearchAlgo(Runtime)
        console.log(`movies are`, movies)
        res.send(movies)
    } else if (Runtime === '' & genres === []) {
        let movies = noParamsSearchAlgo();
        console.log(`movies are`, movies)
        res.send(movies)
    }


    // res.json({ "ok": "ok" })
})


app.listen(port, () => console.log(`Server is running on port ${port}`));