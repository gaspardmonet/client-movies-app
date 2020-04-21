const data = require('./db');
var jsonQuery = require('json-query')
var movies = data.movies;
var runtime = 95;
// var Genre = 'Comedy';
// var Genre = 'Music'
// var Genre = ['Comedy', 'Crime'];
// var Genre = ["Comedy", "Drama", "Biography"]
var Genre = ["Crime", "Drama", "Music"]
// var Genre = ['Crime'];



function pairwise(list) {
    if (list.length < 2) { return {} };
    var first = list[0],
        rest = list.slice(1),
        pairs = rest.map(function (x) { return [first, x]; })
    return pairs.concat(pairwise(rest));
}
function genreAndDurationSearchAlgo(genre) {
    genre.sort();
    var genreTopush = [];
    console.log(`length is `, genre.length)
    if (genre.length > 2) {
        console.log(`Running for lenght > 2`)

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
        console.log(`genreToPush is `, genreTopush)
        // genreTopush.filter((value, index) => value = ! null)
        // var combimeArray = []
        // genreTopush.map((value, index) => {
        //     combimeArray = [...value, ...genreTopush[index + 1]]
        // })
        console.log(`genreToPush is `, genreTopush)
        return genreTopush;
    }
    else if (genre.length === 2) {
        console.log(`Running for lenght === 2`)
        genre.map(a => {
            console.log(`for`, a)
            genreTopush.push(jsonQuery(`movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
                data: data,
            }).value)
        })
        console.log(`genreToPush is `, genreTopush)
        return genreTopush;
    }
    else if (genre.length === 1) {
        console.log(`Running for lenght === 1`)
        genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
            data: data,
        }).value)
        console.log(`genreToPush is `, genreTopush)
        return genreTopush;
    }
    else {
        console.log(`No genre provided`)
    }
}

function genreSearchAlgo(genre) {
    genre.sort();
    var genreTopush = [];
    console.log(`length is `, genre.length)
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
        // genreTopush.filter((value, index, arr) => value !== (!Array.isArray(array) || !array.length))
        // var combimeArray = []
        // genreTopush.map((value, index) => {
        //     combimeArray = [...value, ...genreTopush[index + 1]]
        // })
        // genreTopush = [...arr1, ...arr2, ...arr3]
        console.log(`genreToPush is `, genreTopush.flat())
        return genreTopush;
    }
    else if (genre.length === 2) {
        console.log(`Running for lenght === 2`)
        genre.map(a => {
            console.log(`for`, a)
            genreTopush.push(jsonQuery(`movies[**][*genres = ${a} ].title`, {
                data: data,
            }).value)
        })
        console.log(`genreToPush is `, genreTopush)
        return genreTopush;
    }
    else if (genre.length === 1) {
        console.log(`Running for lenght === 1`)
        genreTopush.push(jsonQuery(`movies[**][*genres = ${genre} ].title`, {
            data: data,
        }).value)
        console.log(`genreToPush is `, genreTopush)
        return genreTopush;
    }
    else {
        console.log(`No genre provided`)
    }
}


// var a = genreAndDurationSearchAlgo(Genre)
// console.log(`final genreAndDurationSearchAlgo`, a)
// var a = movies.filter(d => {
//     // console.log(d.genres)
//     if (d.genres == Genre) {
//         return d
//     }
// })
// console.log(a)

// const duration = d => d.runtime > runtime - 10 && d.runtime < runtime + 10;
// const Duration = movies.filter(duration);
// var randomMovie = Duration[Math.floor(Math.random() * Duration.length)].title
// console.log(randomMovie)



var a = genreSearchAlgo(Genre)






// console.log(`final genreSearchAlgo`, a)
// // // console.log(`genreToPush is `, genreTopush)









// var Runtime = 100;
// const duration = d => d.runtime > Runtime - 10 && d.runtime < Runtime + 10;

// const Duration = movies.filter(duration);
// console.log(Duration)

// Genre.map((a, b) => {
//     var vvv = jsonQuery(`movies[**][*genres = ${a} & (runtime > ${runtime}-10 & runtime < 10) ].title`, {
//         data: data,
//     }).value
//     // console.log(b)
//     console.log(vvv)
// })




// var www = jsonQuery(`movies[**][*genres = Crime]`, {
//     data: data,
// }).value

// console.log(www)




// movies.map((item, i) => {
//     if (`${item.genre} `.indexOf(searchText.toLowerCase()) !== -1) {
//         return
//     }