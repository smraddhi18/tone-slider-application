module.exports = function validateInput(req, res, next) {
    const { text, toneValue } = req.body;
  
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ success: false, error: "Text input is required." });
    }
  
    if (typeof toneValue !== "number" || toneValue < 0 || toneValue > 100) {
      return res.status(400).json({ success: false, error: "toneValue must be between 0 and 100." });
    }
  
    next();
  };
  