module.exports = function getToneDescription(value) {
    if (value >= 85) return "extremely casual, playful, and informal";
    if (value >= 65) return "casual, friendly, and relaxed";
    if (value >= 55) return "slightly casual and conversational";
    if (value >= 45) return "neutral";
    if (value >= 35) return "slightly formal";
    if (value >= 15) return "formal and professional";
    return "extremely formal, professional, and serious";
  };
  