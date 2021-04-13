import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
    public getUserById(req: Request, res: Response): void {
        try {
            const user = userService.findUserById(req.params.id);
            res.status(200).json(user);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public createUser(req: Request, res: Response): void {
        try {
            userService.createUser(req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public deleteUser(req: Request, res: Response): void {
        try {
            userService.deleteUser(req.params.id);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public updateUser(req: Request, res: Response): void {
        try {
            userService.updateUser(req.params.id, req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public getAutoSuggestUsers(req: Request, res: Response): void {
        const loginSubstring = req.query.loginSubstring as string;
        const limit = Number(req.query.limit);

        try {
            const results = userService.getAutoSuggestUsers(loginSubstring, limit);
            res.status(200).json(results);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }
}

export default new UserController();
