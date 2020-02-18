/* eslint no-console: "off", global-require: "off" */
import 'colors';
import webpack from 'webpack';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import app from './server';

import config from './webpack.config';

require('dotenv').config();

const port = process.env.PORT || 7000;
const homepage = `${__dirname}/client/index.html`;

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  app.use(morgan('dev'));
  app.use('/', express.static(path.join(__dirname, 'client')));
} else {
  app.use('/', express.static(path.join(__dirname, 'client')));
  app.use(require('compression')());
}

app.get('/', (req, res) => {
  res.sendFile(homepage);
});

app.get('*', (req, res) => {
  res.sendFile(homepage);
});

app.listen(port, () => {
  console.log(`Magic happening at: ${port}`.green);
});
