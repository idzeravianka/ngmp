import express from 'express';
import { USER_API } from './configs/api-path-enum/user-api.enum';
import { GROUP_API } from './configs/api-path-enum/group-api.enum';
import userRouter from './routers/user-router';
import groupRouter from './routers/group-router';
import { debugLogger, unhandledErrorLogger } from './logger/unhandled-errors-logger';
import { requestLogger } from './logger/request-logger';
import { commonErrorHandler } from './middlewares';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(USER_API.ROOT, userRouter);
app.use(GROUP_API.ROOT, groupRouter);
app.use(commonErrorHandler);

app.listen(process.env.PORT, () => {
    debugLogger(`server started at http://localhost:${process.env.PORT}`);
});

process.on('uncaughtException', err => {
    const message = `${err.name}: ${err.message}`;
    unhandledErrorLogger(message);
});

process.on('unhandledRejection', () => {
    const message = 'Unhandled rejection';
    unhandledErrorLogger(message);
});
