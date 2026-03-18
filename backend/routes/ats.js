const express = require("express");

const router = express.Router();

router.post("/score", (req, res) => {

  const { resumeText, jobDescription } = req.body;

  const keywords = jobDescription.split(" ");

  let score = 0;

  keywords.forEach(word => {

    if (resumeText.includes(word)) {
      score += 2;
    }

  });

  if (score > 100) score = 100;

  res.json({
    success: true,
    score,
    suggestions: [
      "Add quantified achievements",
      "Add more technical keywords",
      "Improve action verbs"
    ]
  });

});

module.exports = router;