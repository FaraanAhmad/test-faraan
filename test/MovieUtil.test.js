const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl
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
    let movieID;

    describe('PUT /edit-movie/:id', () => {


        it('should update an existing movie', (done) => {
            chai.request(baseUrl)
                .put(`/edit-movie/${movieID}`)
                .send({
                    movieImage: 'Updated image', movieTitle: 'Updated title', 
                    movieDescription: 'Updated description', movieDirectors: 'Updated directors',
                    movieWriters: 'Updated writers', movieStars: 'Updated stars'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal('Movie modified successfully!');
                    done();
                });
        });
    });

});