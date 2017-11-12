const chai = require('chai');
const expect = require('chai').expect;
const haversine = require('haversine');
const db = require('../database/matches.json');
const config = require('../config');
const service = require('./matches.service');

describe('matches.service.js', () => {
  describe('filter', () => {
    const req = {
      app: {
        user: {
          "city": {
            "name": "Leeds",
            "lat": 53.801277,
            "lon": -1.548567
          }
        },
        get: function(key) {
          return this[key];
        }
      },
      matches: db.matches
    };
    const { user } = req.app;
    const start = {
      latitude: user.city.lat,
      longitude: user.city.lon
    };

    it('should not filter matches when there are not any parameters', (done) => {
      const matches = service.filter(req);

      expect(matches).to.have.lengthOf(req.matches.length);
      done();
    });

    it('should not filter matches when query parameters have non-valid names', (done) => {
      req.query = {
        invalidKey: 'invalidValue',
        anotherInvalidKey: true
      };

      const matches = service.filter(req);

      expect(matches).to.have.lengthOf(req.matches.length);
      done();
    });
    
    it('should filter matches with no photo', (done) => {
      req.query = { hasPhoto: 'false' };
      
      const matches = service.filter(req);
      
      matches.forEach(match => {
        expect(match).not.to.have.property('main_photo');
      });
      done();
    });
    
    it('should filter matches with a photo', (done) => {
      req.query = { hasPhoto: 'true' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('main_photo').not.to.be.undefined.and.null.and.empty;
      });
      done();
    });

    it('should filter matches with no exchanged contacts', (done) => {
      req.query = { hasExchanged: 'false' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('contacts_exchanged').to.equal(0);
      });
      done();
    });

    it('should filter matches with exchanged contacts', (done) => {
      req.query = { hasExchanged: 'true' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('contacts_exchanged').to.be.greaterThan(0);
      });
      done();
    });

    it('should filter non-favourite matches', (done) => {
      req.query = { isFavourite: 'false' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('favourite').to.be.false;
      });
      done();
    });

    it('should filter favourite matches', (done) => {
      req.query = { isFavourite: 'true' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('favourite').to.be.true;
      });
      done();
    });

    it('should filter matches with a compatibility score >= 0.75', (done) => {
      req.query = { compatibilityScoreMin: '0.75' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.at.least(0.75);
      });
      done();
    });

    it('should filter matches with a compatibility score <= 0.5', (done) => {
      req.query = { compatibilityScoreMax: '0.5' };

      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.at.most(0.5);
      });
      done();
    });

    it('should filter matches that are older than 30', (done) => {
      req.query = { ageMin: '30' };
      
      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('age').to.be.at.least(30);
      });
      done();
    });

    it('should filter matches that are younger than 40', (done) => {
      req.query = { ageMax: '40' };
      
      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('age').to.be.at.most(40);
      });
      done();
    });

    it('should filter matches that are taller than 170cm', (done) => {
      req.query = { heightMin: '170' };
      
      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.at.least(170);
      });
      done();
    });

    it('should filter matches that are smaller than 170cm', (done) => {
      req.query = { heightMax: '170' };
      
      const matches = service.filter(req);

      matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.at.most(170);
      });
      done();
    });

    it('should filter matches that are located further than 30km', (done) => {
      req.query = { distanceMin: '30' };
      
      const matches = service.filter(req);
      
      matches.forEach(match => {
        const end = {
          latitude: match.city.lat,
          longitude: match.city.lon
        };
        const distance = haversine(start, end);
        expect(distance).to.be.at.least(30);
      });
      done();
    });

    it('should filter matches that are located within 250km', (done) => {
      req.query = { distanceMax: '250' };
      
      const matches = service.filter(req);
      
      matches.forEach(match => {
        const end = {
          latitude: match.city.lat,
          longitude: match.city.lon
        };
        const distance = haversine(start, end);
        expect(distance).to.be.at.most(250);
      });
      done();
    });

    it('should filter matches that are in their 20s, between 170-180cm tall, with a compatiblity score between 0.5 and 0.8, with a photo and within 50-100km', (done) => {
      req.query = {
        hasPhoto: 'true',
        compatibilityScoreMin: 0.5,
        compatibilityScoreMax: 0.8,
        ageMin: '20',
        ageMax: '29',
        heightMin: '170',
        heightMax: '180',
        distanceMax: '50',
        distanceMax: '100'
      };
      
      const matches = service.filter(req);
      
      matches.forEach(match => {
        const end = {
          latitude: match.city.lat,
          longitude: match.city.lon
        };
        const distance = haversine(start, end);
        expect(match).to.have.property('main_photo').not.to.be.undefined.and.null.and.empty;
        expect(match).to.have.property('compatibility_score').to.be.at.least(0.5).and.at.most(0.8);
        expect(match).to.have.property('age').to.be.at.least(20).and.at.most(29);
        expect(match).to.have.property('height').to.be.at.least(170).and.at.most(180);
        expect(distance).to.be.at.least(50).and.at.most(100);
      });
      done();
    });

    it('should filter favourite matches in their 40s, at least 180cm tall, with a photo and within 50-100km', (done) => {
      req.query = {
        hasPhoto: 'true',
        ageMin: '20',
        ageMax: '29',
        heightMin: '170',
        heightMax: '180',
        distanceMax: '50',
        distanceMax: '100'
      };
      
      const matches = service.filter(req);
      
      matches.forEach(match => {
        const end = {
          latitude: match.city.lat,
          longitude: match.city.lon
        };
        const distance = haversine(start, end);
        expect(match).to.have.property('main_photo').not.to.be.undefined.and.null.and.empty;
        expect(match).to.have.property('age').to.be.at.least(20).and.at.most(29);
        expect(match).to.have.property('height').to.be.at.least(170).and.at.most(180);
        expect(distance).to.be.at.least(50).and.at.most(100);
      });
      done();
    });
  });
});