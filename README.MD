Laboratory 7
To run:
npm install
npm start

Endpoints:
Base url: http://localhost:8080
GET all bookmarks: http://localhost:8080/bookmarks
GET bookmarks by title: http://localhost:8080/bookmark?id=123
POST bookmarks: http://localhost:8080/bookmarks
Example:
    Body:
    {
        "title": "PostedBookmark",
        "description": "This is a postedBookmark with post",
        "url": "www.postedBookmark.com/6",
        "rating": 4
    }
DELETE bookmarks: http://localhost:8080/bookmark/:id
    Example:
        http://localhost:8080/bookmark/f4cbe627-47b3-416a-b205-d6aafdea20c
PATCH bookmarks: http://localhost:8080/bookmark/:id
    Example:
        http://localhost:8080/bookmark/f4cbe627-47b3-416a-b205-d6aafdea20c
        Body:
        {
            "id": "f4cbe627-47b3-416a-b205-d6aafdea20c",
            "title" : "Edited",
            "rating": 2
        }
