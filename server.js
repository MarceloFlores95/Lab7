const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonParser = bodyParser.json();
const uuid = require('uuid');
const validateToken = require('./middleware/validateToken')

// Express se usa para crear endpoints.
// Morgan help to send message of GET/POST/DELETE in terminal, locks what is going in the endpoints
// bodyParser is necessary to send data to the body request
// Uuid: This is a Node package that the bookmarks app data structure will require 
// to generate unique ids. Its to create Cryptographically-strong random values

const app = express();

app.use(morgan('dev')) 
app.use(validateToken)

const bookmarks = [
    {
        id: uuid.v4(),
        title: 'Bookmark',
        description: 'This is a bookmark',
        url: 'www.bookmark.com',
        rating: 5
    },
    {
        id: uuid.v4(),
        title: 'Google',
        description: 'This is google',
        url: 'www.google.com/',
        rating: 4
    },
    {
        id: uuid.v4(),
        title: 'Facebook',
        description: 'This is facebook',
        url: 'www.facebook.com/',
        rating: 5
    },
    {
        id: uuid.v4(),
        title: 'Twitter',
        description: 'This is a twitter',
        url: 'www.twitter.com/',
        rating: 5
    },
    {
        id: uuid.v4(),
        title: 'Facebook',
        description: 'This is other facebook',
        url: 'www.facebook.com/other',
        rating: 5
    },
]

app.get('/bookmarks',(req, res) => {
    console.log('GET request of all bookmarks')
    return res.status(200).json(bookmarks)
})

app.get('/bookmark',(req, res) => {
    console.log("Getting one bookmark given the title as parameter.");
    console.log(req.query);
    
    let title = req.query.title;

    if (!title) {
        res.statusMessage = "The 'title' is missing in the querystring";
        return res.status(406).end();
    }

    let result = bookmarks.filter(book => book.title == title)

    if(result.length == 0) {
        res.statusMessage = "The 'bookmark' don´t exist";
        return res.status(404).end();
    }

    return res.status(200).json(result);
})

app.post('/bookmarks', jsonParser,(req,res) => {
    console.log("POST of a new bookmark")
    console.log("Body", req.body);

    let id = uuid.v4();
    let title =req.body.title;
    let description = req.body.description;
    let url =req.body.url;
    let rating = req.body.rating;

    if(!title || !description || !url || !rating) {
        res.statusMessage = "One or more of these parameters is missing in the request: 'title', 'description', 'url', 'rating'";
        return res.status(406).end()
    }
    rating = Number(rating);

    if(isNaN(rating)) {
        res.statusMessage = "The 'raiting' must be a number or is missing";
        return res.status(406).end()
    }

    let newBookmark = {
        id: id,
        title: title,
        description: description,
        url: url,
        rating: rating
    }

    bookmarks.push(newBookmark);
    return res.status(201).json({});
})

app.delete('/bookmark/:id', (req,res) => {
    console.log("DELETE of a bookmark")
    console.log(req.params)
    let id = req.params.id
    
    let bookmarkRemove = bookmarks.findIndex((book) => {
        if(book.id == id) {
            return true;
        }
    })
    console.log(bookmarkRemove)
    if(bookmarkRemove < 0) {
        res.statusMessage = "The bookmark doesn´t exist";
        return res.status(404).end();
    } else {
        bookmarks.splice(bookmarkRemove,1);
        return res.status(200).end();
    }
})

app.patch('/bookmark/:id',jsonParser,(req,res) => {
    console.log("PATCH of a bookmark");
    console.log(req.body)

    let idParam = req.params.id
    let idBody = req.body.id

    if(!idBody) {
        res.statusMessage = "The 'id' is missing in the body"; 
        return res.status(406).end();
    }

    if(idBody != idParam) {
        res.statusMessage = "The 'id' in the body isn´t the same as the param"; 
        return res.status(409).end();
    }

    let bookmarkUpdate = bookmarks.find((bk) => {
        if (bk.id == idBody) {
            if(req.body.title) {
                bk.title = req.body.title;
            }
            if(req.body.description) {
                bk.description = req.body.description;
            }
            if(req.body.url) {
                bk.url = req.body.url;
            }
            if(req.body.rating) {
                bk.rating = req.body.rating;
            }
            return bk
        }
    })

    return res.status(202).json(bookmarkUpdate);
})

app.listen(8080, () => {
    console.log("This server is running on port 8080")
})


// Base url: http://localhost:8080
// GET all bookmarks: http://localhost:8080/bookmarks
// GET bookmarks by title: http://localhost:8080/bookmark?id=123
// POST bookmarks: http://localhost:8080/bookmarks
/*
{
    "title": "PostedBookmark",
    "description": "This is a postedBookmark with post",
    "url": "www.postedBookmark.com/6",
    "rating": 4
}
*/
// DELETE bookmarks: http://localhost:8080/bookmark/:id
// PATCH bookmarks: http://localhost:8080/bookmark/:id


