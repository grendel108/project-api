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
        // Set a header "Accept: text/plain" to request that data format
        requestObject.setRequestHeader("Accept", "text/plain");

        // STEP 6:
        // Finally, actually send this request to their server
        requestObject.send();

        // THIS FUNCTION WAITS (could take 1 sec, could take a minute):.
            // This function only gets called when joke is finished downloading
            // and display joke on webpage as well as console.
        function handleResponse () {
          // Display the joke in the console
          console.log(requestObject.responseText);
          
          // This function runs once the API returns the joke. Now we can display it on the page. 
          // From a design perspective, should this line be here within the handleResponse() method since that method is itself part of the requestJoke() method? 
          jokeBoxElem.textContent = requestObject.responseText;
          
        }

          
} // end of requestJoke function


// Github test: changed in VS Code.