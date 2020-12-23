const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const appsList = require('./playstore-app-list.js');


app.get('/apps', (req, res) => {

    const { sort = '' , genres = '' } = req.query;

    /*-- Check genre validity, filter based on it --*/
    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Invalid genre selected.')
        }
    }

    let results = appsList
        .filter( app => 
            app
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()));

    
    /*-- Check sort validity, filter based on it --*/
    if (sort) {
        if (!['Rating','App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of "Rating" or "App".')
        }
    }

    if (sort === 'App') {
        results.sort((a,b) => {
            return (
                a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 
                : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0
            );
        })
    } else if (sort === 'Rating') {
        results.sort( (a,b) => {
            return a[sort] > b[sort] ? -1 : a[sort] < a[sort] ? 1 : 0;
        });
    }

    res.send(results);
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
})