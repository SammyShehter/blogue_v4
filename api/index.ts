import express, { Express } from 'express';
import loginRouter from './routes/users.route';
import blogueRouter from './routes/blogue';
import { senderCheck } from './middleware/common.middleware';

function createServer(): Express {
  const app = express();

  app.use(express.json());

  app.use('/api/users', loginRouter);
  app.use('/api/blogue', senderCheck, blogueRouter);

  return app;
}

export default createServer;
