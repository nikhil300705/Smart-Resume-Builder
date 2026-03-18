const express = require("express");
const router = express.Router();

const {
  generateSuggestions,
  realtimeSuggestion,
  calculateATSScore,
  optimizeResume
} = require("../controllers/aiController");

router.post("/suggest", generateSuggestions);
router.post("/realtime", realtimeSuggestion);
router.post("/ats-score", calculateATSScore);
router.post("/optimize", optimizeResume);

module.exports = router;