const express = require('express');
let cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser());

//
app.use((req, res, next) => {
    if (req.cookies.name === 'king' && req.cookies.password === 'queen') {
        req.authorized = true;
    } else {
        req.authorized = false;
    }
    next();
})

app.use((req, res) => {
    console.log('[Server]: Request for: ', req.path);
    console.log(req.cookies);

    if (req.authorized) {
        return res.status(200).json({
            message: 'Logged in ',
            headers: req.headers,
            cookie: req.cookies,
            auth: req.authorized
        })
    } else {
        return res.status(401).json({
            message: 'Incorrect cred',
            headers: req.headers,
            cookie: req.cookies,
            auth: req.authorized
        })
    }

    // res.json({
    //     server: '03',
    //     ip: '172.16.0.12',
    //     path: req.path,
    //     headers: req.headers,
    //     cookie:req.cookies
    // });

})

app.listen(80, () => console.log('Node.js app listening on port 80'))