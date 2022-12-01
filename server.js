const express = require('express');
const students = require('./studentInfo');
const port = 3000;
const app = express();

const fs = require('fs') 
app.engine('madeline', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    
    const rendered = content.toString()
      .replace('#name#', '<h1>' + options.name + '</h1>')
      .replace('#id#', '<h2>' + options.id + '</h2>')
      .replace('#school#','<h2>'+ options.school + '</h2>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
    return callback(null, rendered);
  })
})
app.set('views', './views') ;
app.set('view engine', 'madeline');


function student() {
     let result ='';
     result += (`<ul><h2>Students</h2>`);

    for(let i = 0; i < students.length; i++) {
        result += (`<li><a href="./students/${i}">${students[i].name}</a></li>\n`);
    }
    result += (`</ul>`);
 
    return result;
}

app.get('/', (req, res) => {
    res.send (
        `<h1>Welcome to our homepage</h1>
        <h2><a href="./about"> About </a></h2>
        <h2><a href="./students">Students</a></h2>
        <h2><a href="./contact">Contact Info</a></h2>
        <h2><a href="./values"> Our Values</a></h2>
        <h2><a href="./reviews">Reviews</a></h2>
        <h2><a href="./games">Connect 4</a></h2>
        <h2><a href="./google">Google</a></h2>
        
        
        `
        
    );
});

app.get('/about/', (req, res) =>{
    res.send(`<h2> Welcome to Harris University, where all of you dreams will come true, tuition is 20000 a semester and we guarantee nothing.</br>Pay us please. </h2>`);
});

app.get('/students', (req, res) => {
    res.send(student());
});

app.get('/students/:idOfStudent', (req, res) =>{
    res.render('template', { name: students[req.params.idOfStudent].name, id: students[req.params.idOfStudent].id, school: students[req.params.idOfStudent].school});
});

app.get('/contact', (req, res) => {
    res.send(`<h2> Phone number is unavailable, email as well. You can send us a check though. <a href="/contact/payMe">Click here to send money though</a></h2>`);
});

app.get('/contact/payMe', (req, res) => {
    res.render('money', {message: `Routing number: 111111111111 </br> PayPal: PayMe123 </br> Crypto Wallet (prefered for umm..security): 122e433s3454s-AWkSSidd23
    </br> Your money... I mean education is important to us. Please join us.`});
});

app.get('/values', (req, res) => {
    res.send(`<h2> education </h2>`);
});

app.get('/reviews', (req, res) => {
    res.send(`<h2> Cannot display </h2>`);
});

app.get('/games', (req, res) => {
    res.send(`<h2><a href="https://richard-harris1992.github.io/Connect4"> Connect 4 </a></h2>`);
});

app.get('/google', (req, res) => {
    res.send(`<h2><a href="https://www.google.com/"> google </a></h2>`);
});


app.listen(port, () => console.log(`3000 is used`));
