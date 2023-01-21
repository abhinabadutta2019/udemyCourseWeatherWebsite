//path module

const path = require("path");
//express
const express = require("express");
//
const hbs = require("hbs");

//
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//
const app = express();

//
// console.log(__dirname);

// //path.join used
// console.log(path.join(__dirname, "../public/index.html"));

//Define path for express
const publicDirectoryPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// handelbars location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//app.use-static directory
app.use(express.static(publicDirectoryPath));

//handelbars route index page

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abhi",
  });
});

//handelbars route about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Abhi",
  });
});

// handelbars route help page

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Abhi",
  });
});

// //get takes two arguments
// app.get("", (req, res) => {
//   res.send("<h1>weather</h1>");
// });

// // old help page route
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Abhi",
//     age: 27,
//   });
// });

// //old about page route
// app.get("/about", (req, res) => {
//   res.send("<h1>about</h1>");
// });

// ---weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  //
  // res.send({
  //   forecast: "It is snowing",
  //   location:''
  //   address: req.query.address,
  // });
});

//---products
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);

  //
  res.send({ products: [] });
});

// help 404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "Abhi",
  });
});

//404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found-404",
    name: "Abhi",
  });
});

//setting up server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
