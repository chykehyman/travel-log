const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const logs = require('./api/logs');
const { notFound, errorHandler } = require('./middleware');

const pe = process.env;
const env = pe.NODE_ENV || 'development';
const { PORT } = pe;
const app = express();

mongoose.connect(pe.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] :remote-addr - :remote-user [:date[clf]]', {
  skip: (req, res) => env === 'production' && res.statusCode < 400,
}))
  .use(helmet())
  .use(cors({
    origin: pe.CORS_ORIGIN,
  }))
  .use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use('/api/logs', logs);

app.use(notFound)
  .use(errorHandler);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

module.exports = {
  env,
};
