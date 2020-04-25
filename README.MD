<h2>Laboratory 7</h2>
<p>To run:</p>
<p>npm install</p>
<p>npm start</p>

<p>Endpoints:</p>
<p>Base url: http://localhost:8080</p>
<p>GET all bookmarks: http://localhost:8080/bookmarks</p>
<p>GET bookmarks by title: http://localhost:8080/bookmark?id=123</p>
<p>POST bookmarks: http://localhost:8080/bookmarks</p>
<p>Example:</p>
    <p>Body:
    {
        "title": "PostedBookmark",
        "description": "This is a postedBookmark with post",
        "url": "www.postedBookmark.com/6",
        "rating": 4
    }</p>
<p>DELETE bookmarks: http://localhost:8080/bookmark/:id</p>
    <p>Example:</p>
        <p>http://localhost:8080/bookmark/f4cbe627-47b3-416a-b205-d6aafdea20c</p>
<p>PATCH bookmarks: http://localhost:8080/bookmark/:id</p>
    <p>Example:</p>
        <p>http://localhost:8080/bookmark/f4cbe627-47b3-416a-b205-d6aafdea20c</p>
        <p>Body:
        {
            "id": "f4cbe627-47b3-416a-b205-d6aafdea20c",
            "title" : "Edited",
            "rating": 2
        }</p>
