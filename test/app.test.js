const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /apps endpoint', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const appExample = res.body[0];
                expect(appExample).to.include.keys(
                    'App', 'Category', 'Rating'
                );
            })
    });
    it('should return 200 code if genre is valid', () => {
        return supertest(app)
            .get('/apps')
            .query( { genres: 'Action' } )
            .expect(200);
    });
    it('should return 400 code if genre is invalid', () => {
        return supertest(app)
            .get('/apps')
            .query( { genres: 'skiing' } )
            .expect(400);
    });
});