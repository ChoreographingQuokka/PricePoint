const Profile = require('../../db/models/profiles.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Profile model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function () {
    return dbUtils.rollbackMigrate();
  });

  // Resets database back to original settings
  afterEach(function () {
    return dbUtils.rollback();
  });

  it('Should be able to retrieve test data', function () {
    return Profile.forge().fetchAll()
      .then(function (results) {
        expect(results.length).toBe(1);
        expect(results.at(0).get('id')).toBe(1);
      });
  });

  // it('Should verify that all usernames are unique', function (done) {
  //   // Insert a user with a username that's already in existence
  //   Profile.forge({ username: 'TestUser1', password: 'abc' }).save()
  //     .then(function (result) {
  //       done(new Error('was not supposed to succeed'))
  //     })
  //     .catch(function (err) {
  //       expect(err).to.be.an('error');
  //       expect(err).to.match(/duplicate key value violates unique constraint/);
  //       done();
  //     });
  // });

  it('Should be able to update an already existing record', function () {
    return Profile.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).toBe(1);
      })
      .then(function () {
        return Profile.where({ id: 1 }).save({ first: 'James', last: 'Davenport' }, { method: 'update' });
      })
      .then(function () {
        return Profile.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('first')).toBe('James');
        expect(result.get('last')).toBe('Davenport');
      });
  });

  it('Should be able to delete a record', function () {
    // Inserts a user
    return Profile.where({ id: 1 }).destroy()
      // verifies that the user has been inserted
      .then(function () {
        return Profile.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).toBe(null);
      });
  });

});
