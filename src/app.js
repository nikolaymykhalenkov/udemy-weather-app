require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static Directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        authorName: "Nikolay Mykhalenkov"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        authorName: "Nikolay Mykhalenkov"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        authorName: "Nikolay Mykhalenkov"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({ error: 'You must provide an address' });

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({ error });
        forecast(latitude, longitude, (error, weatherInfo) => {
            if (error) return res.send({ error });
            res.send({
                forecast: weatherInfo.forecast,
                weatherIcons: weatherInfo.weather_icons,
                address: req.query.address,
                location: location
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Help",
        authorName: "Nikolay Mykhalenkov",
        errorText: "Help Article Not Found"
    });
});


app.get('*', (req, res) => {
    res.render('error', {
        title: "About",
        authorName: "Nikolay Mykhalenkov",
        errorText: "404 - Page Not Found"
    });
});

app.listen(port, () => {
    //console.info("App listening at port 3000");
});