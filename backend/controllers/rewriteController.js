const { getCachedResponse, setCachedResponse } = require("../services/cacheService");
const getToneDescription = require("../utils/getToneDescription");
const hashKey = require("../utils/hashKey");
const mistralService = require("../services/mistralService");

module.exports = async function rewriteController(req, res, next) {
  try {
    const { text, toneValue } = req.body;
    const toneDescription = getToneDescription(toneValue);
    const cacheKey = hashKey(`${text}:${toneValue}`);
    const cached = getCachedResponse(cacheKey);

    if (cached) {
      return res.json({ success: true, data: { rewrittenText: cached } });
    }

    const rewrittenText = await mistralService.rewrite(text, toneDescription);

    setCachedResponse(cacheKey, rewrittenText);
    res.json({ success: true, data: { rewrittenText } });
  } catch (error) {
    next(error);
  }
};
