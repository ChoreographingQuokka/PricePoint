'use strict';
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const amazon = require('../middleware/amazon');
const CategoriesController = require('../controllers').Categories;

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/search')
  .get((req, res) => {
    return amazon.search(req.query.q)
      .then(products => {
        return Promise.map(products, product => product.fetch({
          withRelated: [
            { 'prices': q => q.orderBy('created_at', 'DESC') },
            'prices.vendor',
            'product_urls.vendor'
          ]
        }));
      })
      .then(results => {
        res.send({results});
      })
      .catch(err => {
        console.log(err.message);
        res.sendStatus(503);
      });
  });

router.route('/categories')
  .post((req, res) => {
    return CategoriesController.addCategory(req.body.id, req.body.table)
      .then(model => {
        let data = model.serialize();
        console.log('Successfully created a category table');
        res.status(201).send({
          tableId: data.id,
          name: data.name,
          list: []
        });
      })
      .catch(err => {
        console.log('Error creating a category table');
        res.status(500).send(err);
      });
  });
router.route('/categories')
  .get((req, res) => {
    return CategoriesController.retrieveCategory(req.query.id)
      .then(data => {
        console.log('Successfully retrieved category information');
        res.send(data);
      })
      .catch(err => {
        console.log('Error retrieving category information');
      });
  });

router.route('/categories/:id')
  .get((req, res) => {
    return CategoriesController.addItem(req.query.id, req.query.table, req.query.upc)
      .then(res => {
        console.log('Successly saved an item');
      })
      .catch(err => {
        console.log('Error saving an item');
      });
    res.send('meow');
  });
module.exports = router;

router.route('/removeItem')
  .post((req, res) => {
    return CategoriesController.removeItem(req.body.id, req.body.table, req.body.upc)
      .then(res => {
        console.log('Successfully removed item');
      })
      .catch(err => {
        console.log('Error removing item');
      });
  });

router.route('/removeCategories')
  .post((req, res) => {
    return CategoriesController.removeCategory(req.body.id, req.body.table)
      .then(res => {
        console.log('Successfully removed a category table');
      })
      .catch(err => {
        console.log('Error removing a category table');
      });
  });
