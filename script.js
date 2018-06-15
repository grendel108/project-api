// EVENTS:
// when user clicks button
// when the joke finishes downloading

//////////////////////////////////////////////////////////////

// It never hurts to double check that our JavaScript file is working:
console.log('our JS file loaded!');


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdicsEV3qamI6F5aXJc6WRuvAEBHeGWC8",
    authDomain: "barry-firebase-test.firebaseapp.com",
    databaseURL: "https://barry-firebase-test.firebaseio.com",
    projectId: "barry-firebase-test",
    storageBucket: "barry-firebase-test.appspot.com",
    messagingSenderId: "200692124595"
  };
  firebase.initializeApp(config);



// Set up JavaScript objects for each DOM element
let jokeButtonElem = document.getElementById("jokeButton");
let jokeBoxIdElem = document.getElementById("jokeBoxId");
let jokeBoxJokeElem = document.getElementById("jokeBoxJoke");

///////////////////////////////////////////////////////////////////////

// Set up event listener for when the user click the button

jokeButtonElem.addEventListener("click", getDadJoke);

// Make call to Dad Joke API after user clicks button.
// The only function of the button should be to call another function to request a joke. The button should not do anything else such as displaying the joke. Alternatively, this could be wrapped in an anonymous function.
function getDadJoke() {
    console.log("User clicked button! Sending request to API.");
  
   requestJoke();  
}

/////////////////////////////////////////////////////////////////

// Make an API request to get a random dad joke
function requestJoke() {

        // STEP 1: Make a new object for our API call (AJAX)
        var requestObject = new XMLHttpRequest();

        // STEP 2:
        // Set up event listener so that when joke finished downloading,
        // call the function named handleResponse
        requestObject.addEventListener("load", handleResponse);

        // STEP 3:
        // Set up the API info to prepare the request:

        // STEP 4:
        // -- the HTTP verb: GET
        // -- the URL (or endpoint) that we want to get
        requestObject.open("GET", "https://icanhazdadjoke.com/");

        // STEP 5:
        // Set a header "Accept: [data format]" to request that data format
        requestObject.setRequestHeader("Accept", "application/json");

        // STEP 6:
        // Finally, actually send this request to their server
        requestObject.send();

        // THIS FUNCTION WAITS (could take 1 sec, could take a minute):.
            // This function only gets called when joke is finished downloading
            // and display joke on webpage as well as console.
        function handleResponse () {

            // Display the joke in the console in the raw format specified.
            console.log(requestObject.responseText);
          
            // This function runs once the API returns the joke. Now we can display it on the page. 
            // From a design perspective, should this line be here within the handleResponse() method since that method is itself part of the requestJoke() method? 
            // jokeBoxElem.textContent = requestObject.responseText;

            // Parse JSON string and assign to object.
            let objJSON = JSON.parse(requestObject.responseText);
            console.log(objJSON.id);
            console.log(objJSON.joke);

            jokeBoxIdElem.textContent = objJSON.id;
            jokeBoxJokeElem.textContent = objJSON.joke;

            // Save joke to Firebase.
            // These are saved as separate Key-Value pairs. Why don't I save the jokes into a single dadJoke object that nests the jokes? Review Penguins data structure in 3.5.
            
            let dbJoke = firebase.database().ref("dadjokes");
            let dadJokeObjects = {
                [objJSON.id]: objJSON.joke
            }
            dadJokeObjects[objJSON.id] = objJSON.joke;
            // This is replacing the old joke in the object rather than adding a new one.
            dbJoke.set(dadJokeObjects);


        }

          
} // end of requestJoke function


// Github test: changed in VS Code.