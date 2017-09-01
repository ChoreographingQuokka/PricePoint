const httpMocks = require('node-mocks-http');
const dbUtils = require('../../db/lib/utils.js');
const passport = require('../middleware/passport');
const models = require('../../db/models');

describe('Authentication', () => {
  let fakeFlash = function(key, message) {
    let object = {};
    object[key] = message;
    return object;
  };

  beforeEach(function () {
    return dbUtils.rollbackMigrate();
  });

  // Resets database back to original settings
  afterEach(function () {
    return dbUtils.rollback();
  });

  describe('Passport local-login strategy', () => {
    it('passport passes user if email and password match', done => {
      let request = httpMocks.createRequest({
        body: {
          email: 'admin@domain.com',
          password: 'admin123'
        }
      });
      request.flash = fakeFlash;
      let response = httpMocks.createResponse();
      models.Profile.where({ email: 'admin@domain.com' }).fetch()
        .then(profile => {
          passport.authenticate('local-login', {}, (err, user, info) => {
            expect(typeof user).toBe('object');
            expect(user.id).toBe(profile.get('id'));
            expect(user.email).toBe(profile.get('email'));
            done(err);
          })(request, response);
        });
    });

    it('passport passes false if email and password do not match', done => {
      let request = httpMocks.createRequest({
        body: {
          email: 'admin@domain.com',
          password: 'incorrect'
        }
      });
      request.flash = fakeFlash;
      let response = httpMocks.createResponse();
      passport.authenticate('local-login', {}, (err, user, info) => {
        expect(user).toBe(false);
        expect(err).toBeNull;
        done(err);
      })(request, response);
    });
  });

  describe('Passport local-signup strategy', () => {
    it('passport passes false if email already exists', done => {
      let request = httpMocks.createRequest({
        body: {
          email: 'admin@domain.com',
          password: 'admin123'
        }
      });
      request.flash = fakeFlash;
      let response = httpMocks.createResponse();
      passport.authenticate('local-signup', {}, (err, user, info) => {
        expect(user).toBeFalsy;
        expect(info.signupMessage).toBe('An account with this email address already exists.');
        done(err);
      })(request, response);
    });

    it('passport passes user if email does not already exist', done => {
      let request = httpMocks.createRequest({
        body: {
          email: 'TestUser4@mail.com',
          password: '101112'
        }
      });
      request.flash = fakeFlash;
      let response = httpMocks.createResponse();
      passport.authenticate('local-signup', {}, (err, user, info) => {
        models.Profile.where({ email: 'TestUser4@mail.com' }).fetch()
          .then(profile => {
            expect(typeof user).toBe('object');
            expect(user.id).toBe(profile.get('id'));
            expect(user.email).toBe(profile.get('email'));
            done(err);
          });
      })(request, response);
    });
  });
});
