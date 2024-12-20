const express = require('express');
const router = express.Router();
const favQController = require('../controllers/favQ');

router.post('/getRandomQuotes', async (req, res) => {
  try {
    const { number, tag } = req.body;
    if(number === undefined || number === null || isNaN(number)) return res.status(422).json(`The 'number' parameter is mandatory and should be a number`);
    const normalizedTag = tag ? `${tag}`.trim() : undefined;
    const result = await favQController.getRandomListOfQuotes(Math.floor(number), normalizedTag);
    console.log(`number of quotes: ${result.length}`);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;