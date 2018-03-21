const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');


//  next() ამის გარეშე ვერ გაცდები ამ ფუნქციას და რეფრეშის დროს არ დარეფრეშდება ...
app.use((req, res, next) => {
    var now = new Date().toString();
    let log = (`${now} : ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('error');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>hello<h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'welcome to my website. ',
    });
});

app.get('/about',(req, res) => {
   res.render('about.hbs',{
       pageTitle: 'About page',
   });
});

app.get('/bad',(req, res) => {
   res.send({
       errorMessage: 'Unable to handle request. '
   });
});


// უსმენს პორტს
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});