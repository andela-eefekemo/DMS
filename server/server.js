import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.send('The Badass');
});

app.listen(5000);