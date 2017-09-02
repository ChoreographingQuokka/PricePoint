'use strict';
const request = require('supertest');
const express = require('express');
const app = require('../app.js');

describe('basic server', function() {
  it('sends back hello world', function() {
    return request(app)
      .get('/api')
      .expect(200)
      .expect(function(res) {
        expect(res.text).toBe('Hello World!');
      });
  });

  it('accepts POST request', function() {
    return request(app)
      .post('/api')
      .expect(201)
      .expect(function(res) {
        expect(res.body.data).toBe('Posted!');
      });
  });
});
