import express from 'express';
import blogueRouter from './routes/blogue';
import { senderCheck } from './middleware/common.middleware';
import { init, initEvents } from './utils/common';

const app = express();

app.use(express.json());

app.use('/api', senderCheck, blogueRouter);

const port = process.env.PORT

init()

initEvents.once("go", () => {
  app.listen(port, () => {
    console.log(`> Ready on port ${port}`)
  })
})