const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const haversine = require('haversine');
const config = require('../config');
const server = require('../app');

chai.use(chaiHttp);

describe('matches.route.js', () => {
  describe('GET /api/matches', () => {
    it('should get all matches', (done) => {
      chai.request(server)
      .get('/api/matches')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        done();
      });
    });

    it('should get all matches with a photo', (done) => {
      chai.request(server)
      .get('/api/matches?hasPhoto=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('main_photo');
        });
        done();
      });
    });

    it('should get all matches in contact', (done) => {
      chai.request(server)
      .get('/api/matches?hasExchanged=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('contacts_exchanged').to.be.greaterThan(0);
        });
        done();
      });
    });

    it('should get all favourite matches', (done) => {
      chai.request(server)
      .get('/api/matches?isFavourite=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('favourite').to.be.true;
        });
        done();
      });
    });

    it('should get all matches with a compatibility score >= 0.75', (done) => {
      chai.request(server)
      .get('/api/matches?compatibilityScoreMin=0.75')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('compatibility_score').to.be.at.least(0.75);
        });
        done();
      });
    });

    it('should get all matches with a compatibility score <= 0.5', (done) => {
      chai.request(server)
      .get('/api/matches?compatibilityScoreMax=0.5')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('compatibility_score').to.be.at.most(0.5);
        });
        done();
      });
    });

    it('should get all matches with a compatibility score between 0.5 and 0.75', (done) => {
      chai.request(server)
      .get('/api/matches?compatibilityScoreMin=0.5&compatibilityScoreMax=0.75')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('compatibility_score').to.be.within(0.5, 0.75);
        });
        done();
      });
    });

    it('should get all matches who are older than 30', (done) => {
      chai.request(server)
      .get('/api/matches?ageMin=30')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('age').to.be.at.least(30);
        });
        done();
      });
    });

    it('should get all matches who are younger than 40', (done) => {
      chai.request(server)
      .get('/api/matches?ageMax=40')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('age').to.be.at.most(40);
        });
        done();
      });
    });

    it('should get all matches who are in their 30s', (done) => {
      chai.request(server)
      .get('/api/matches?ageMin=30&ageMax=39')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('age').to.be.within(30, 39);
        });
        done();
      });
    });

    it('should get all matches who are taller than 170cm', (done) => {
      chai.request(server)
      .get('/api/matches?heightMin=170')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('height_in_cm').to.be.at.least(170);
        });
        done();
      });
    });

    it('should get all matches who are smaller than 170cm', (done) => {
      chai.request(server)
      .get('/api/matches?heightMax=170')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('height_in_cm').to.be.at.most(170);
        });
        done();
      });
    });

    it('should get all matches who are between 160cm and 170cm', (done) => {
      chai.request(server)
      .get('/api/matches?heightMin=160&heightMax=170')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        res.body.matches.forEach(match => {
          expect(match).to.have.property('height_in_cm').to.be.within(160, 170);
        });
        done();
      });
    });

    it('should get all matches who are located further than 300km', (done) => {
      chai.request(server)
      .get('/api/matches?distanceMin=300')
      .end((err, res) => {
        const user = server.get('user');
        
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        
        const start = {
          latitude: user.city.lat,
          longitude: user.city.lon
        };
        res.body.matches.forEach(match => {
          const end = {
            latitude: match.city.lat,
            longitude: match.city.lon
          };
          const distance = haversine(start, end);
          expect(distance).to.be.at.least(300);
        });
        done();
      });
    });

    it('should get all matches who are located within 30km', (done) => {
      chai.request(server)
      .get('/api/matches?distanceMax=30')
      .end((err, res) => {
        const user = server.get('user');

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');
        
        const start = {
          latitude: user.city.lat,
          longitude: user.city.lon
        };
        res.body.matches.forEach(match => {
          const end = {
            latitude: match.city.lat,
            longitude: match.city.lon
          };
          const distance = haversine(start, end);
          expect(distance).to.be.at.most(30);
        });
        done();
      });
    });

    it('should get all matches who are located within 30km and 100km', (done) => {
      chai.request(server)
      .get('/api/matches?distanceMin=30&distanceMax=100')
      .end((err, res) => {
        const user = server.get('user');

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.matches).to.be.an('array');

        const start = {
          latitude: user.city.lat,
          longitude: user.city.lon
        };
        res.body.matches.forEach(match => {
          const end = {
            latitude: match.city.lat,
            longitude: match.city.lon
          };
          const distance = haversine(start, end);
          expect(distance).to.be.within(30, 100);
        });
        done();
      });
    });

    it('should get a json { errors } object if hasPhoto is neither true nor false', (done) => {
      chai.request(server)
      .get('/api/matches?hasPhoto=neithertruenorfalse')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('hasPhoto');
        done();
      });
    });

    it('should get a json { errors } object if hasExchanged is neither true nor false', (done) => {
      chai.request(server)
      .get('/api/matches?hasExchanged=neithertruenorfalse')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('hasExchanged');
        done();
      });
    });

    it('should get a json { errors } object if isFavourite is neither true nor false', (done) => {
      chai.request(server)
      .get('/api/matches?isFavourite=neithertruenorfalse')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('isFavourite');
        done();
      });
    });

    it('should get a json { errors } object if compatibilityScoreMin is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?compatibilityScoreMin=now')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('compatibilityScoreMin');
        done();
      });
    });

    it('should get a json { errors } object if compatibilityScoreMax is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?compatibilityScoreMax=tomorrow')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('compatibilityScoreMax');
        done();
      });
    });

    it('should get a json { errors } object if ageMin is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?ageMin=yesterday')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('ageMin');
        done();
      });
    });

    it('should get a json { errors } object if ageMax is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?ageMax=notanumber')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('ageMax');
        done();
      });
    });

    it('should get a json { errors } object if heightMin is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?heightMin=stillnotanumber')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('heightMin');
        done();
      });
    });

    it('should get a json { errors } object if heightMax is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?heightMax=notanumber')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('heightMax');
        done();
      });
    });

    it('should get a json { errors } object if distanceMin is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?distanceMin=veryfar')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('distanceMin');
        done();
      });
    });

    it('should get a json { errors } object if distanceMax is not a number', (done) => {
      chai.request(server)
      .get('/api/matches?distanceMax=farfaraway')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.json;
        expect(res.body.errors).to.have.property('distanceMax');
        done();
      });
    });
  });
});