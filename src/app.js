const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcotry to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arun Raj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arun Raj'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: "Help",
        name: "Arun Raj"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } 

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                foreCast: foreCastData,
                location,
                address: req.query.address
            })
        })
        
    })

    // res.send({
    //     forecast: "It is snowing",
    //     location: 'Chennai',
    //     address: req.query.address
    // });
});

// app.get('/products', (req, res) => {
//     console.log(req.query);
//     if (!req.query.search) {
//         res.send({
//             error: "You must provide a search term"
//         })
//     } else {

//     }
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Arun Raj",
        errorMessage: "Help article not found"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Arun Raj",
        errorMessage: "Page Not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port 3000" + port);
})










