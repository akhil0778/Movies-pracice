const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
    SELECT
      *
    FROM
      movie;`;
  const moviesArray = await db.all(getMoviesQuery);
  response.send(moviesArray);
});

//add movie
app.post("/movies/", async (request, response) => {
  const movieDetails = request.body;
  const { directorId, movieName, leadAct } = movieDetails;
  const addMovieQuery = `INSERT INTO movie(6,"Jurassic Park" , "Jeff Goldblum")
    VALUES(${directorId},${movieName},${leadAc});`;
  const dbResponse = await db.run(addMovieQuery);
  const movieId = db.response.lastID;
  response.send("Movie Successfully Added");
});
