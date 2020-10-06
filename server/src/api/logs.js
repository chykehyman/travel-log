const { Router } = require('express');
const LogEntry = require('../model/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const logEntries = await LogEntry.find({});
    res.json(logEntries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdLog = await logEntry.save();

    res.json(createdLog);
  } catch (error) {
    if (error.name === 'ValidationError') res.status = 422;
    next(error);
  }
});

module.exports = router;
