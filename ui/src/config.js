const config = {
  API_URL_BASE: 'http://localhost:5000/api/',
  API_URL_MATCHES: 'http://localhost:5000/api/matches',
  COMPATIBILITY_SCORE_MIN: 0.01,
  COMPATIBILITY_SCORE_MAX: 0.99,
  AGE_MIN: 18,
  AGE_MAX: 95,
  HEIGHT_MIN: 135,
  HEIGHT_MAX: 210,
  DISTANCE_MIN: 30,
  DISTANCE_MAX: 300
};

config.getApiBaseUrl = function() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.REACT_APP_API_URL_BASE;
    case 'development':
    default:
      return this.API_URL_BASE;
  }
};

config.getApiMatchesUrl = function() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.REACT_APP_API_URL_MATCHES;
    case 'development':
    default:
      return this.API_URL_MATCHES;
  }
};

export default config;