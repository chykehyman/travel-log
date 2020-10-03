const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware');

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 1337;
const app = express();

app.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] :remote-addr - :remote-user [:date[clf]]', {
  skip: (req, res) => env === 'production' && res.statusCode < 400,
}))
  .use(helmet())
  .use(cors({
    origin: 'http://localhost:3000',
  }));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use(notFound)
  .use(errorHandler);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

module.exports = {
  env,
};
