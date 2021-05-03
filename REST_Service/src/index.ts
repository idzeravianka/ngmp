import express from 'express';
import { USER_API } from './configs/api-path-enum/user-api.enum';
import { GROUP_API } from './configs/api-path-enum/group-api.enum';
import userRouter from './routers/user-router';
import groupRouter from './routers/group-router';

const app = express();

app.use(express.json());
app.use(USER_API.ROOT, userRouter);
app.use(GROUP_API.ROOT, groupRouter);

app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});
