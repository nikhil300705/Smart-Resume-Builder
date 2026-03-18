const express = require("express");
const html_to_pdf = require("html-pdf-node");

const router = express.Router();

router.post("/export", async (req, res) => {

  const { html } = req.body;

  const file = { content: html };

  const pdf = await html_to_pdf.generatePdf(file, {
    format: "A4"
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf"
  });

  res.send(pdf);

});

module.exports = router;