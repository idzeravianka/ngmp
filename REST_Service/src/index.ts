import express from 'express';
import { env } from './configs/env';
import { USER_API } from './configs/api-path-enum/user-api.enum';
import userRouter from './routers/user-router';

const app = express();

app.use(express.json());
app.use(USER_API.ROOT, userRouter);

app.listen(env.port, () => {
    console.log(`server started at http://localhost:${env.port}`);
});
