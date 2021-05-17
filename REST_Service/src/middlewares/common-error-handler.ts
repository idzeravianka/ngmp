import { Request, Response } from 'express';

export const commonErrorHandler = (error: any, _req: Request, res: Response) => {
    return res.status(500).json({ error:'Internal Server Error' });
};
