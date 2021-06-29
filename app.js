const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const clucksRouter = require("./routes/clucks");

const app = express();

app.set("view engine", "ejs");

app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride((req, res) => {
    if(req.body && req.body._method) {
        const method = req.body._method;
        delete req.body._method; 
        return method; 
    }

}));

app.use((req, res, next) => {
    res.locals.username = req.cookies.username || "";
    next(); 
})

app.get("/", (req,res) => {
    res.render("home")
})

const COOKIE_MAX_AGE = 100*60*60*24*30;
app.post("/sign_in", (req,res) => {
    res.cookie("username", req.body.username, {maxAge: COOKIE_MAX_AGE});

    res.redirect("/");
})

app.delete("/sign_out", (req, res) => {
    res.clearCookie("username")
    res.redirect("/");
})

app.use("/clucks", clucksRouter);

const PORT = process.env.PORT || 5000
const ADDRESS = "localhost"
const environment = app.get('env'); //returns from the app config the environemnt that is set up

// The callback will be invoked when our server starts and logs 
// to the console the address which we can click on using Cmd + click
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is listening on http://${ADDRESS}:${PORT} in ${environment}`)
})

