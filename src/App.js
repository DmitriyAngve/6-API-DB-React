import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null); // for clear previous error
    // const response = await fetch("https://swapi.dev/api/films");
    const response = await fetch("https://swapi.dev/api/film"); // for simulate error
    // .then((response) => {
    //   return response.json();
    // })
    const data = await response.json();
    // .then((data) => {
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
    // });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

// ~~ SENDING A GET REQUEST ~~
// STEP: 1
// 1.1 Create function "fetchMovieHandler" for using "fetch()" and passed like string a URL to which you wanna sent a request - first agument. Second argument - a JavaScript object where we configure various options (for example where add extra headers, body or change the HTTP request method) but here we don't need that. Let's handle the response and fetch returns a promise which allows us to then react to the response or any potential error we might be getting
// 1.2 Now we're getting a promise here which is an object which will eventually yield some data.
// 1.3 Add to fetch() function "then()" to the final function which will be called whenever we got a response
// 1.4 Add "catch()" to handle any errors
// Let's work with "then()": "then(response =>{})". Here we get a "response" and I'll write an arrow function and use teh response. Response is argument here is now actually an object with a bunch of data about the response add "json()" method which will automatically translate JSON response body from API to a real JavaScript object which we can use in our code
// 1.5 "response.json()" - returns a promise, add another ".then()" block here, which will "then()" be fired once this data transformations is done, and here we then get our transformed data. We can access data of array: "data.results" and store these results in some state which we then update in this place here and which we then use here for "MoviesList"
// 1.6 Add useState (import and initialize)
// 1.7 Once we've got our movies once we've got the parsed and extracted movies, call "setMovies" and set my "data.results" (Array get from API as my new state)
// 1.8 Now forward "movies" (from useState) as a value for the movies prop
// 1.9 Before setting the data, the results as a new state I'll transform them "const transformedMovies = data.results.map()" to convert ever object in the results array into a new object and stored with "transformedMovies"
// 1.10 Logic for "map()": return a new object. which has an "id: movieData.episode_id" ("episode_id" from API). Do the same for title. And for openingText. And for releaseDate.
// 1.11 Now it's transformed and now store in "setMovies(transformedMovies)"
// 1.12 Now connect "fetchMovieHandler" to button -> add "onClick={fetchMovieHandler}"
// ~~ SENDING A GET REQUEST ~~

// ~~ ASYNC AND AWAIT ~~
// Let's transfom code. Add "async" and "await". Behind the scenes it's basically does the same as if use "then()" blocks.
// Let's slightly rework code and remove First "then()" block.
// Add "const response = await fetch(..." and remove "then()".
// Add "const data = await response.json()" and remove second "then()"
// ~~ ASYNC AND AWAIT ~~

// ~~ HANDLING LOADING AND DATA STATE ~~
// Let's work with managing state to reach handling loading
// STEP: 1
// 1.1 For tell whether we're waiting or not, we can intoduce a second piece of state, name it: "const [isLoading, setIsLoading]= useState(false)"
// 1.2 initially set this "useState(false)" to false -> initially we not loading data, when this component is loaded, when the app component is rendered to the screen we're not loading data. But when we call  "fetchMovieHandler" when this function starts to execute we of course want to call "setIsLoading(true)" here and set this to true. (add to function). With that we changed the state when we start to load.
// 1.3 Once we're done, we want to call "setIsLoading(false)" again, and set it to false again, because we're not loading anymore, we already got some data (added in the end of "fetchMovieHandler")
// 1.4 Now we can use the "isLoading" state to render a loading spinner or some loading text.
// 1.5 Add "shortcut" in JSX: "{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}" - then only if we're not loading and we got movies only then we display the movies list.
// 1.6 Alternative: "{isLoading && <p>Loading...</p>}" - no matter if we already have loaded movies or not we started a new loading process and therefore, of course, we want to show to loading text
// 1.7 If we want to show some fallback content if we're not loading and we got no movies though. (" movies.length === 0" - if we got no movies). "{!isLoading && movies.length === 0 && <p>Found no movies.</p>}"
// ~~ HANDLING LOADING AND DATA STATE ~~

// ~~ HANDLING HTTP ERRORS ~~
// STEP: 1
// 1.1 Simulate error in "const response = await fetch("https://swapi.dev/api/film")"
// 1.2 Add third state, "const [error, setError] = useState(null)" - null, because initially we have no error, and whenever "fetchMovieHandler" is fired, we also might wanna reset this error to null to make sure that we clear any previous errors we might have gotten (or use .catch() method if we use then())
// 1.3
// ~~ HANDLING HTTP ERRORS ~~
