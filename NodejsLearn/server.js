const express = require('express');
const fs = require("fs").promises;

let cookieParser = require('cookie-parser')
const path = require("path");

const app = express()
app.use(cookieParser());
app.use(express.urlencoded());

app.get('/dashboard', async (req, res) => {
    console.log(req.cookies);
    if(req.cookies.auth === 'true'){
        const data = await fs.readFile(path.resolve('./public/dash.html'), "utf8");
        return res.end(data);
    }else{
        res.redirect('/loginForm');
    }
})

app.get('/loginForm', async (req, res) => {
    if(req.cookies.auth === 'true'){
        const data = await fs.readFile(path.resolve('./public/dash.html'), "utf8");
        return res.end(data);
    }
    const data = await fs.readFile(path.resolve('./public/login.html'), "utf8");
    return res.end(data);
})

app.get('/logout', async (req, res) => {
    res.cookie('auth' , 'false');
    res.redirect('/loginForm');
})


app.post('/login', (req, res) => {
    console.log('apple');
    console.log(2);
    if(req.body.user === "sindhu" && req.body.pass === "123"){
        res.cookie('auth' , 'true');
        return res.redirect('/dashboard');

    }else{
        res.redirect('/loginForm');
    }
   // res.redirect('/dashboard');
    // res.json({
    //     info: 'Apple route',
    //     header: req.headers,
    //     data: req.body
    // })
})
//
// app.use((req, res, next) => {
//     if (req.method === 'GET' && req.path === '/apple') {
//         console.log('apple')
//     }
//
//     if (req.cookies.name === 'king' && req.cookies.password === 'queen') {
//         req.authorized = true;
//     } else {
//         req.authorized = false;
//     }
//     next();
// })

// app.use((req, res) => {
//     console.log('[Server]: Request for: ', req.path);
//     console.log(req.cookies);
//
//     if (req.authorized) {
//         return res.status(200).json({
//             message: 'Logged in ',
//             headers: req.headers,
//             cookie: req.cookies,
//             auth: req.authorized
//         })
//     } else {
//         return res.status(401).json({
//             message: 'Incorrect cred',
//             headers: req.headers,
//             cookie: req.cookies,
//             auth: req.authorized
//         })
//     }
//
//     // res.json({
//     //     server: '03',
//     //     ip: '172.16.0.12',
//     //     path: req.path,
//     //     headers: req.headers,
//     //     cookie:req.cookies
//     // });
//
// })

app.listen(80, () => console.log('Node.js app listening on port 80'))