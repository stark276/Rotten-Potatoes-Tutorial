// app.js
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const express = require('express')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// DB
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useNewUrlParser: true
});

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});

// INDEX
app.get('/', (req, res) => {
  Review.find()  // returns promise 
    .then(reviews => { // resolve it 
      res.render('reviews-index', {
        reviews: reviews
      });
    })
    .catch(err => { // reject
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})


