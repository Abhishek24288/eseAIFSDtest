const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController');
const matchController = require('../controllers/matchController');
const aiController = require('../controllers/aiController');

// Candidate CRUD
router.post('/candidates', candidateController.addCandidate);
router.get('/candidates', candidateController.getAllCandidates);
router.get('/candidates/:id', candidateController.getCandidateById);
router.delete('/candidates/:id', candidateController.deleteCandidate);

// Basic Matching Logic
router.post('/match', matchController.matchCandidates);

// AI Matching Logic
router.post('/ai/shortlist', aiController.getAIShortlist);

module.exports = router;
