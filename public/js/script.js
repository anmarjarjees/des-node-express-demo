// Front-End JavaScript Code File:
// alert("test API Demo");

/*
Document Object Model (DOM):
****************************
Using DOM to get a reference to the two buttons based on their IDs
To access the "addEventListener()" method and attach a "click" event to them:
Link: https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Introduction
*/

// Declaring our two JS variables to refer to each button:
const getFetchBtn = document.getElementById("getFetch");
const getAsyncBtn = document.getElementById("getAsync");

/*
Working with Event Listener (To review):
> element.addEventListener(event-type, function)

AddEventListener method has two required arguments:
- The Event Type like "click" event
- CB (Callback function: passing a function name as an argument) 
- OR we can write an inline anonymous arrow function as well
*/

// Adding event listeners to the buttons so they trigger the respective functions:

// Triggers fetch data with Fetch API:
getFetchBtn.addEventListener('click', getDataFetch);

// Triggers fetch data with Async/Await API:
getAsyncBtn.addEventListener('click', getDataAsync);

// The URL for accessing the JSON data from Express:
const apiURL = 'http://localhost:3000/api/instruments';

/*
 * This function fetches data from the server using fetch API.
 * It uses the traditional ".then()" chaining for handling promises.
 */
function getDataFetch() {
    // test:
    // alert("fetch with .then()");

    /*
    To let the front-end bring data from the back-end, 
    we can use the same function that we studied before: "fetch()" :-).
    The fetch() function is the modern way to make HTTP requests.
    
    Here's the basic fetch() template:
    fetch('http://example.com/movies.json')
    .then((response) => response.json()) // Converts the response to JSON
    .then((data) => console.log(data)); // Logs the data from the API to console

    Link: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    */
    fetch(apiURL)
        .then((response) => response.json()) // Converts response to JSON
        .then((data) => console.log(data)) // Logs the JSON data

    // Below is more advanced version of using fetch with validation:
    fetch(apiURL)
        .then((response) => response.json())  // Converts response to JSON
        .then((data) => {
            console.log("Raw data:", data);  // Check the structure of the data
            console.log("Is it an array?", Array.isArray(data));  // Check if it's an array
            if (Array.isArray(data)) {
                console.log(data);  // Proceed if it's an array
            } else {
                console.error('Expected an array but got:', data);
            }
        })
        .catch((error) => console.error('Error fetching data:', error));
} // end getDataFetch()
/*
Exploring For Loops in JavaScript :-)
*************************************
for "for...in" loop
Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

for "for...of" loop
Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
*/

/*
In this example, 
we explore "for...in" and "for...of" loops, 
which are used for iterating over objects and arrays respectively.
Using the right loop for the right data structure helps ensure cleaner and more efficient code.
*/

/*
Let's render this data nicely in the second example using "async/await" :-)
*/

/*
As we learned before, using async/await is considered "Syntactic Sugar" :-), 
making asynchronous code more readable and concise.
Link: https://en.wikipedia.org/wiki/Syntactic_sugar

This function will:
- Return a promise
- Work asynchronously without blocking other code from running
Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
*/

// The async function to fetch data with async/await
async function getDataAsync() {
    // test:
    // alert("fetch with await");

    /*
    When using async/await, instead of using .then() to handle the resolved promise,
    we simply use "await" inside the async function to wait for the promise to resolve.
    It allows us to write asynchronous code that looks like synchronous code, 
    making it easier to read and debug.

    Important Note:
    Without "await," the response would be an unresolved Promise object. 
    To access its data, we would need to use .then()
    or chain other methods. The "await" keyword pauses the function execution 
    until the Promise is fulfilled.

    Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    */
    try {
        const response = await fetch(apiURL); // Waits for the response to come back from the API

        // The response from the server (typically in JSON format) needs to be parsed into a usable JavaScript object/array
        const data = await response.json(); // Converts (parses) the response body text to JavaScript object or array

        // Logging the data to the browser console for inspection and debugging
        console.log(data); // Example: [{...}, {...}, {...}] => array of objects with nested values

        /*
        Example OUTPUT from our API:
        [
            {
                "name": "Piano",
                "history": "Invented in 1700 by Bartolomeo Cristofori in Italy.",
                "types": ["Baby Grand", "Parlor Grand", "Concert Grand"],
                "categories": ["61 keys", "76 keys", "88 keys"],
                "brands": ["Steinway & Sons", "Yamaha", "Casio"]
            },
            ...
        ]

        Each object in the array represents a musical instrument, with:
        - name: The instrument's name
        - history: A short historical background
        - types: A list of the instrument’s variations
        - categories: A list of general classifications (example: size, key count)
        - brands: Popular companies that manufacture the instrument
        */

        /*
        We will now loop through this array of objects and display each instrument’s
        details (including all nested arrays) using an unordered list format (<ul> and <li> tags).
        */

        let htmlContent = "<ul>"; // Start of the main unordered list

        for (const instrument of data) {
            htmlContent += `<li><strong>${instrument.name}</strong><br>`; // Name of the instrument in bold
            htmlContent += `<em>History:</em> ${instrument.history}<br>`;  // Brief history of the instrument

            // Display the instrument types (if any)
            if (Array.isArray(instrument.types)) {
                htmlContent += `<strong>Types:</strong><ul>`;
                for (const type of instrument.types) {
                    htmlContent += `<li>${type}</li>`; // Each type as a list item
                }
                htmlContent += `</ul>`;
            }

            // Display the instrument categories (if any)
            if (Array.isArray(instrument.categories)) {
                htmlContent += `<strong>Categories:</strong><ul>`;
                for (const category of instrument.categories) {
                    htmlContent += `<li>${category}</li>`; // Each category as a list item
                }
                htmlContent += `</ul>`;
            }

            // Display the popular brands (if any)
            if (Array.isArray(instrument.brands)) {
                htmlContent += `<strong>Brands:</strong><ul>`;
                for (const brand of instrument.brands) {
                    htmlContent += `<li>${brand}</li>`; // Each brand as a list item
                }
                htmlContent += `</ul>`;
            }

            htmlContent += `</li><br>`; // Close the current instrument entry and add some spacing
        }

        htmlContent += "</ul>"; // Close the main list

        // Display the complete HTML content in the element with id="data"
        document.getElementById("data").innerHTML = htmlContent;

    } catch (error) {
        /*
        If an error occurs during the fetch (example: network issue, server is down, or invalid JSON),
        the code inside this catch block will run. It's important to gracefully handle such situations.
        */
        console.error('There has been an error with the fetch operation:', error);
        // Optionally, display a friendly message to the user on the webpage
        document.getElementById("data").innerHTML = "<p>Error fetching data, please try again later.</p>";
    }
} // end getDataAsync()

/*
In summary, both methods ("fetch with .then()" and "fetch with async/await") 
allow us to retrieve data from the server.
Using async/await often results in cleaner, 
more readable code, especially with more complex asynchronous logic.
*/