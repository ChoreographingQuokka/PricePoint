'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const models = require('../db/models');


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(middleware.morgan('dev'));
}

app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/product/:upc', (req, res) => {
  var state = {};
  models.Product.where({ upc: req.params.upc }).fetch()
    .then(product => {
      if (!product) {
        throw product;
      }
      return product.serializeWithPrices()
        .then(productWithPrices => {
          state.results = [productWithPrices];
        })
        .then( ()=> {
          state.user = req.user;
          state.tables = {
            default: []};
          res.render('index', {state});
        });
    })
    .error(err => {
      console.log(err);
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});


module.exports = app;
