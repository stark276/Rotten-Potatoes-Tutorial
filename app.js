// app.js
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const expressHandlebars = require("express-handlebars")
const Handlebars = require('handlebars')
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')

const app = express()
// handlebar setup
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
// app.engine('handlebars', expressHandlebars({
//   defaultLayout: 'main'
// }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: true
}));

// DB
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      console.log("reviews", reviews);
      res.render('reviews-index', {
        reviews: reviews
      });
    })
    .catch(err => {
      console.log(err);
    })
})
// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  console.log(req.params.id)
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', {
      review: review
    })
  }).catch((err) => {
    console.log(err.message);
  })
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
