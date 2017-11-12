const haversine = require('haversine');
const config = require('../config');
const db = require('../database/matches.json');

const service = {};

service.filter = function(req) {
  let { matches } = req;
  const { query, app } = req;
  const user = app.get('user');
  const start = {
    latitude: user.city.lat,
    longitude: user.city.lon
  };

  for (const queryProp in query) {
    const matchProp = config[queryProp];
    switch (queryProp) {
      case 'hasPhoto':
      case 'isFavourite':
        matches = matches.filter(match => {
          switch (query[queryProp]) {
            case 'false':
            case '0':
              return !match[matchProp];
            case 'true':
            case '1':
              return match[matchProp];
            default:
              return true;
          }
        });
        continue;
      case 'hasExchanged':
        matches = matches.filter(match => {
          switch (query[queryProp]) {
            case 'false':
            case '0':
              return match[matchProp] !== undefined && match[matchProp] === 0;
            case 'true':
            case '1':
              return match[matchProp] !== undefined && match[matchProp] > 0;
            default:
              return true;
          }
        });
        continue;
      case 'compatibilityScoreMin':
        matches = matches.filter(match => match[matchProp] !== undefined && match[matchProp] >= parseFloat(query[queryProp]));
        continue;
      case 'ageMin':
      case 'heightMin':
        matches = matches.filter(match => match[matchProp] !== undefined && match[matchProp] >= parseInt(query[queryProp]));
        continue;
      case 'distanceMin':
        matches = matches.filter(match => {
          const end = {
            latitude: match.city.lat,
            longitude: match.city.lon
          };
          return (match.city !== undefined) && (haversine(start, end) >= parseFloat(query[queryProp]));
        });
        continue;
      case 'compatibilityScoreMax':
        matches = matches.filter(match => match[matchProp] !== undefined && match[matchProp] <= parseFloat(query[queryProp]));
        continue;
      case 'ageMax':
      case 'heightMax':
        matches = matches.filter(match => match[matchProp] !== undefined && match[matchProp] <= parseInt(query[queryProp]));
        continue;
      case 'distanceMax':
        matches = matches.filter(match => {
          const end = {
            latitude: match.city.lat,
            longitude: match.city.lon
          };
          return (match.city !== undefined) && (haversine(start, end) <= parseFloat(query[queryProp]));
        });
    }
  }
  return matches;
}

module.exports = service;