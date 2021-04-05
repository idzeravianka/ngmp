import { Request, Response } from 'express';
import { incrementId } from '../helpers/increment-id';
import { User } from '../models/user.model';
import { mockedUsers } from './mocked-users';

class UserService {
    public getUserById(req: Request, res: Response): void {
        const userId = req.params.id;

        const user = mockedUsers.find(user => user.id === userId) || null;

        user ? res.status(200).json(user) : res.status(404).json({ error: 'User not found' });
    }

    public createUser(req: Request, res: Response): void {
        const user: User = {
            ...req.body,
            id: incrementId(mockedUsers),
            isDeleted: false
        };

        mockedUsers.push(user);

        res.status(200).json(mockedUsers);
    }

    public deleteUser(req: Request, res: Response): void {
        const userId = req.params.id;
        const userIndex = mockedUsers.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            mockedUsers[userIndex] = {
                ...mockedUsers[userIndex],
                isDeleted: true
            };

            res.status(200).json(mockedUsers[userIndex]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    public updateUser(req: Request, res: Response): void {
        const userId = req.params.id;
        const userDataForUpdate = req.body;
        const userIndex = mockedUsers.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            mockedUsers[userIndex] = {
                ...mockedUsers[userIndex],
                ...userDataForUpdate
            };

            res.status(200).json(mockedUsers[userIndex]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    public getAutoSuggestUsers(req: Request, res: Response): void {
        const results = mockedUsers.reduce((acc: User[], user) => {
            const matchesSubstring = user.login.toLowerCase().includes((req.query.loginSubstring as string).toLowerCase());
            const limitIsNotExceeded = acc.length < Number(req.query.limit);

            if (matchesSubstring && limitIsNotExceeded) acc.push(user);

            return acc;
        }, []);

        results.sort((a, b) => (a.login > b.login) ? 1 : -1);

        res.status(200).json(results);
    }
}

export default new UserService();
