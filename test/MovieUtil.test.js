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
    let movieID = "1731983610108878";

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


        
        it('movie title should be empty', (done) => {
            chai.request(baseUrl)
                .put(`/edit-movie/${movieID}`)
                .send({
                    movieImage: 'Updated image', movieTitle: ' ', 
                    movieDescription: 'Updated description', movieDirectors: 'Updated directors',
                    movieWriters: 'Updated writers', movieStars: 'Updated stars'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('The movie title must not be empty');
                    done();
                });
        });
        
        it('movie title should not have any numbers', (done) => {
            chai.request(baseUrl)
                .put(`/edit-movie/${movieID}`)
                .send({
                    movieImage: 'Updated image', movieTitle: 324243234243, 
                    movieDescription: 'Updated description', movieDirectors: 'Updated directors',
                    movieWriters: 'Updated writers', movieStars: 'Updated stars'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('The movie title must be a string');
                    done();
                });
        });

        it('movie title must be filled', (done) => {
            chai.request(baseUrl)
                .put(`/edit-movie/${movieID}`)
                .send({
                    movieImage: 'Updated image', movieTitle: null, 
                    movieDescription: 'Updated description', movieDirectors: 'Updated directors',
                    movieWriters: 'Updated writers', movieStars: 'Updated stars'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('The movie title must be filled');
                    done();
                });
        });
    });

});