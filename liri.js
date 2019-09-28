require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// console.log(keys.spotify);

// global variables for arguments in node

var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join("+");
var userInput2 = process.argv.slice(3).join(" ");

// call spotify api to get songs information

function spotifyThis(input) {

    spotify
        .search({
            type: 'track',
            query: input,
            limit: 5
        })
        .then(
            (response) => {

                for (let i = 0; i < response.tracks.items.length; i++) {

                    let artist = response.tracks.items[i].artists[0].name;
                    let songName = response.tracks.items[i].name;
                    let previewLink = response.tracks.items[i].external_urls.spotify;
                    let albumName = response.tracks.items[i].album.name;
                    console.log("\n=====================================\n");
                    console.log(`\nArtist: ${artist}\nSong: ${songName}\nAlbum: ${albumName}\nLink to song: ${previewLink}`);
                    console.log("\n=====================================\n");
                }
            })
        .catch(function (err) {
            console.log(err);
        });
}

// call bandsintown api for concert information

function concertThis(input) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
            (response) => {

                let venueName = response.data[0].venue.name;
                let venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.region;
                let date = moment(response.data[0].datetime).format("MM/DD/YYYY");
                console.log("\n=====================================\n");
                console.log(`\nCurrent Concert Information For: ${userInput2}\nConcert Venue: ${venueName}\nVenue Location: ${venueLocation}\nConcert Date: ${date}`);
                console.log("\n=====================================\n");
            })
        .catch(err => {
            console.log(err);
        });
}

// use axios to make a request from ombd server to get movie information

function movieThis(input) {

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
            (response) => {
                let title = response.data.Title;
                let yearReleased = response.data.Year;
                let rating = response.data.imdbRating;
                let rottenTom = response.data.Ratings[1].Value;
                let language = response.data.Language;
                let plot = response.data.Plot;
                let countryProduced = response.data.Country;
                let actors = response.data.Actors;
                console.log("\n=====================================\n");
                console.log(`\nTitle: ${title}\n Year Released: ${yearReleased}\nIMBD Rating: ${rating}\nRotten Tomatoes Rating: ${rottenTom}\nCountry Produced In: ${countryProduced}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}`);
                console.log("\n=====================================\n");
            })
        .catch(err => {
            console.log(err);
        });
}

function doWhatItSays() {

}

// give different cases for which function to call up

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