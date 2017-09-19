'use strict';
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const models = require('../../db/models');


router.route('/user')
  .get((req, res) => {
    return models.Profile.where({ email: req.query.email }).fetch()
      .then((profile) => {
        if (profile) {
          return profile;
        } else {
          console.log('WARNING: user not in database.');
          res.sendStatus(404);
        }
      })
      .error(err => {
        console.error('No friend with that Email exists');
        throw err;
      })
      .then((profile) => {
        res.send(profile);
      })
      .catch(() => {
        console.log('WARNING: user not in database.');
        res.sendStatus(404);
      });
  });

module.exports = router;
