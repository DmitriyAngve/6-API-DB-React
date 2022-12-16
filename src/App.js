import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // for clear previous error

    try {
      const response = await fetch(
        "https://react-http-angve-default-rtdb.firebaseio.com/movies.json"
      );
      // const response = await fetch("https://swapi.dev/api/films");
      // const response = await fetch("https://swapi.dev/api/film"); // for simulate error
      // .then((response) => {
      //   return response.json();
      // })

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

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
      // });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
      {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      <></>
      {/* </section> */}
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
// 1.3 Add "try{} catch{}" block to wrap all code.
// 1.4 I can use "Axios" library, which use for sending requests would generate and tho a real error for error status code. Since here I not using "Axios" here but the Fetch API, we have to do this to our own: "response.ok" object which we get back has this "ok" field, which basically signals whether the response was successful or not.
// 1.5 Add "ifcheck": if(!response.ok){} then generate ahd thrwo our own error in that case "throw new Error("")" - throw this error if have an unseccessufl respones, and won't continue with the next step in line: "const transformedMovies = data.results...". Instead, we'll make it into this catch block here I add "setError(error.message)"
// 1.6 Add to JSX code for rendering: "{!isLoading}" and do error "{!isLoading && error}" and display "{!isLoading && error && <>}"
// 1.7 Even if we have error, we're not loading anymore: move " setIsLoading(false)" out of "try-catch" block.
// 1.8 In addition to the other checks: add "!error" - get no error. " {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}"
// STEP 2:
// 2.1 More elegant way: create variable "let content = <p>Found no movies.</p>"
// 2.2 Add several new "ifcheck"'s.
// ~~ HANDLING HTTP ERRORS ~~

//

// ~~ USING useEffect() FOR REQUESTS ~~
// To immediately fetchted data we can use another concept - use useEffect Hook
// because sending a HTTP request is a side effect which changes our components state
// STEP: 1
// 1.1 Let's use "useEffect": import, add to "App" and call "fetchMovieHandler",so now  this function is still called if I click the button (don't gorget "fetchMoviesHandler"), but in addition also whenever this component is re-evaluated.
// 1.2 To avoid an infinite task we add second argument (array of dependencies), where we define when this effect function should be executed again. Explanation: It will only execute again if the dependencies listed here change. If array of dependencies is empty -> useEffect() will never run again, except for the very first time the component is loaded (if reload the data fetch immediately)
// 1.3 Let's refer in dependencies into function "fetchMoviesHandler" because if this function changes this effect should be re-executed and this function could change if we would be using some external state in function body. Problem - function is a object and these function will technically change whenever this component re-renders (we wanns create infinite loop, if stay like this).
// 1.4 Better solution of these problem - "useCallback" hook and wrap "fetchMoviesHandler" with that.
// 1.4.1 transform it to const: "const fetchMovieHandler = useCallback(async () => {...}, [])". And list any dependencies this function might have
// 1.5 Move useEffect call after "fetchMovieHandler" definition
// ~~ USING useEffect() FOR REQUESTS ~~

// ~~ UPDATE APP FOR THE NEXT STEPS ~~
// STEP: 1
// 1.1 Add AddMovie.js file with component
// 1.2 Create "addMovieHandler" inside of App Component
// 1.3 Add to JSX code section with "<AddMovie onAddMovie={addMovieHandler} />" for render with Component

// STEP 2: Create Firebase database in test mode
// 2.1 Replace "response" object to "const response = await fetch(     "https://react-http-angve-default-rtdb.firebaseio.com/movies.json");"
// 2.2 "movies.json" in URL will then hust create a new node in that database basically, it's a dynamic rest API which you can confugure here by using different segments to store data in defferent nodes of your database. ".json" - Firebase specific, they need this ".json" at the end of the URL you are sending requests to otherwise requests will fail

// ~~ UPDATE APP FOR THE NEXT STEPS ~~
