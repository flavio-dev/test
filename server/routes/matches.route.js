const express = require('express');
const { check, validationResult } = require('express-validator/check');
const db = require('../database/matches.json');
const service = require('../services/matches.service');

const router = express.Router();

// returns the filtered matches
router.get('/', [
  check('hasPhoto').isBoolean().optional(),
  check('hasExchanged').isBoolean().optional(),
  check('isFavourite').isBoolean().optional(),
  check('compatibilityScoreMin').isFloat().optional(),
  check('compatibilityScoreMax').isFloat().optional(),
  check('ageMin').isInt().optional(),
  check('ageMax').isInt().optional(),
  check('heightMin').isInt().optional(),
  check('heightMax').isInt().optional(),
  check('distanceMin').isInt().optional(),
  check('distanceMax').isInt().optional()
],(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  
  req.matches = db.matches;
  const matches = service.filter(req);
  res.json({ matches });
});

module.exports = router;