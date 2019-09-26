require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
console.log(keys.spotify);


var whatToDo = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input){

    spotify
    .search({ type: 'track', query: input, limit: 1 })
    .then(function(response) {
      console.log(JSON.stringify(response));
    })
    .catch(function(err) {
      console.log(err);
    });



}

function concertThis(){

}

function movieThis(){

}

function doWhatItSays(){

}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays(userInput);
        break;
}