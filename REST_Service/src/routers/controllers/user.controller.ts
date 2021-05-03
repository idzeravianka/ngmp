import { Request, Response } from 'express';
import userService from '../../services/user.service';

class UserController {
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.findUserById(req.params.id);
            res.status(200).json(user);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            await userService.createUser(req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            await userService.updateUser(req.params.id, req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async getAutoSuggestUsers(req: Request, res: Response): Promise<void> {
        const loginSubstring = req.query.loginSubstring as string;
        const limit = Number(req.query.limit);

        try {
            const results = await userService.getAutoSuggestUsers(loginSubstring, limit);
            res.status(200).json(results);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }
}

export default new UserController();
