var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./config/database");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");

var passport = require("passport");
var configPassport = require("./config/passport");

//set up passport middleware
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session())

//connnect to db
db.startDB();

var port = 3000;
// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUnititialized: false
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
//set up static server
app.use(express.static("public"));
//set up our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up routes
var authroutes = require("./controllers/authroutes");
var routes = require("./controllers/routes");
app.use("/auth", authroutes);
app.get("/", (req, res) => {
  res.redirect("/students");
});
app.use("/students", routes);


// set up error middleware
app.use(function (req, res) {
  res.statusCode = 404;
  res.end("Page doesn't exist");
});

// set up server
app.listen(port, () => {
  console.log("port listening on port " + port);
});
