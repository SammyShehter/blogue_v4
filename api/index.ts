import express, { Express } from 'express';
import loginRouter from './routes/login';
import blogueRouter from './routes/blogue';

function createServer(): Express {
  const app = express();

  app.use(express.json());

  app.use('/api/users', loginRouter);
  app.use('/api/blogue', blogueRouter);

  return app;
}

export default createServer;
