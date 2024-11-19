const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;
describe('Resource API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });
    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    let count = 0;
let resourceId; // Variable to store the ID of the resource

// Test Suite for adding resources
describe('POST /add-resource', () => {
    it('should return 500 for validation errors', (done) => {
        chai.request(baseUrl)
            .post('/add-resource')
            .send({
                movieImage: 'Test Resource', movieTitle: 'invalidemail', movieDescription: 'Test ', movieDirectors:
                    'Short', movieWriters: 'invalidemail', movieStars: 'invalidemail'
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body.message).to.equal('description too short');
                done();
            });
    });

    it('should add a new resource', (done) => {
        chai.request(baseUrl)
            .post('/add-resource')
            .send({
                movieImage: 'Test Resource', movieTitle: 'invalidemail', movieDescription: 'Test Location Test Location Test Location Test Location', movieDirectors:
                    'Short', movieWriters: 'invalid-email', movieStars: 'invalid-email'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(count + 1);
                resourceId = res.body[res.body.length - 1].id; // Store the ID ofthe newly added resource
                done();
            });
    });
});
});
