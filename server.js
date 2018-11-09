const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =  process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
   if(err) {
     console.log('Unable to append to log')
   }
});
next();
});
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// }); 

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
   return text.toUpperCase();
});
app.get('/', (req,res) => {
   //res.send('<h1> Hello Express!</h1>');
   res.render('home.hbs', {
      welcomeText: 'Welcome to our site! ',
      pageTitle: 'Home Page'
      
   });
  //  res.send({
  //      name: 'Alan',
  //      likes: ['outdoors', 'games', 'family time']


  //  })
});

app.get('/about', (req,res) => {
 // res.send('About Page');
 res.render('about.hbs', {
   pageTitle: 'About Page'
 });
});

app.get('/bad', (req,res) => {
 var errorMessasge = {
   message: 'Unable to handle requst'
 };
 res.send(errorMessasge);
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

