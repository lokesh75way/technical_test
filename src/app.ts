import express from 'express';
import bodyParser from 'body-parser';
import recommendationsRouter from './routes/recommendations';
import usersRouter from './routes/users';
import { initializeDatabase } from './utils/database';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = 8000;
app.use(cors())
app.use(bodyParser.json());

app.use('/recommendations', recommendationsRouter);
app.use('/users', usersRouter);
app.use(errorHandler)

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
