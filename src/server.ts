import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/', routes);

const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app