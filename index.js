const express = require('express');
const { config } = require('./config/config');
const cors = require('cors');
const {logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes');

const app = express();
const port = config.port;

app.use(express.json());

const whiteList = config.whiteList;
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}

app.use(cors(options));

require('./utils/auth');

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
