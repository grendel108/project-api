// EVENTS:
// when user clicks button
// when the joke finishes downloading

//////////////////////////////////////////////////////////////

// It never hurts to double check that our JavaScript file is working:
console.log('our JS file loaded!');

// Set up JavaScript objects for each DOM element
let jokeButtonElem = document.getElementById("jokeButton");
let jokeBoxElem = document.getElementById("jokeBox");

///////////////////////////////////////////////////////////////////////

// Set up event listener for when the user click the button

jokeButtonElem.addEventListener("click", getDadJoke);

// Make call to Dad Joke API after user clicks button.
function getDadJoke() {
    console.log("this is working!");
  
   let dadJoke = requestJoke(); 
  
  
  
    // jokeBoxElem.textContent = requestObject.responseText;
  
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
        // Set a header "Accept: application/json" to request that data format
        requestObject.setRequestHeader('Accept', 'text/plain');

        // STEP 6:
        // Finally, actually send this request to their server
        requestObject.send();

        // THIS FUNCTION WAITS (could take 1 sec, could take a minute):.
            // This function only gets called when joke is finished downloading
            // and display joke on webpage as well as console.
        function handleResponse () {
          // Display the joke in the console
          console.log(requestObject.responseText);
          
          // Return the joke as output, so we can use it outside of this function   
          return requestObject.responseText;
          
        }

          
} // end of requestJoke function
