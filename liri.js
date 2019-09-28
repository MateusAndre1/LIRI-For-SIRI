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
            limit: 1
        })
        .then(function (response) {
            console.log("\n=====================================\n");
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
            console.log(JSON.stringify(response.tracks.items[0].name));
            console.log(JSON.stringify(response.tracks));
            console.log("\n=====================================\n");
            
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