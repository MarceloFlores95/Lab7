const apiKey = '2abbf7c3-245b-404f-9473-ade729ed4653'; 

function validateToken(req,res,next) {
    let token = req.headers.authorization;

    if(!token) {
        token = req.headers['book-api-key'];
        if(!token) {
            token = req.query.apiKey;
        }
    }
    
    if(token != `Bearer ${apiKey}`) {
        if(token != apiKey) {
            res.statusMessage = "The 'TOKEN' is invalid.";
            return res.status(401).end()
        }
    }
    
    next();
}

module.exports = validateToken;