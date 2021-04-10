const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// console.log(__dirname)
//console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Masrur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Masrur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text',
        name: 'Masrur'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide address.',
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address,
            })
        })
    })
})

//app.com
//app.com/help
//app.com/about
app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        errorMessage: 'Help article not found.',
        name: 'Masrur'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        errorMessage: 'Page not found.',
        name: 'Masrur'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})