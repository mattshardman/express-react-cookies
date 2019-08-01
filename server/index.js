const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

function cookieMiddleware(req, res, next) {
    if (!req.cookies.myCookie) {
        const { name, value, options} = { 
            name: 'myCookie', 
            value: 'hello', 
            options: { maxAge: 900000, httpOnly: true } 
        };
        res.cookie(name, value, options);
    } else {
        console.log(req.cookies)
        console.log('cookie exists');
    }
    next();
}

app.use(cookieMiddleware);

app.get('/', (req, res) => {
    res.status(200).send('hi');
});

app.listen(4000, () => console.log('listening'));