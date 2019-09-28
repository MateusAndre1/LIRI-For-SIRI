require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// console.log(keys.spotify);


var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join("+");
var userInput2 = process.argv.slice(3).join(" ");

function spotifyThis(input) {

    spotify
        .search({
            type: 'track',
            query: input,
            limit: 5
        })
        .then(function (response) {

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

function concertThis(input) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";    

    axios.get(queryUrl).then(
       function (response){

            let venueName = response.data[0].venue.name;
            let venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.region;
            let date = moment(response.data[0].datetime).format("MM/DD/YYYY");           
            console.log("\n=====================================\n");
            console.log(`\nCurrent concert information for: ${userInput2}\nConcert Venue: ${venueName}\nVenue Location: ${venueLocation}\nConcert Date: ${date}`);
            console.log("\n=====================================\n");
        })
        .catch(err => {
            console.log(err);
        });
}

function movieThis(input) {

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
          console.log("Release Year: " + response.data.Year);
        })
        .catch(err => {
            console.log(err);
        });
}

function doWhatItSays() {

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