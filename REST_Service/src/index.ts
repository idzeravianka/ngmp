import express from 'express';
import { USER_API } from './routers/routes/user-api.enum';
import userRouter from './routers/user/router';

const app = express();
const port = 3000;

app.use(express.json());
app.use(USER_API.ROOT, userRouter);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
