import { User } from '../models/user.model';

export const incrementId = (users: User[]): string => {
    const lastId = Number(users[users.length - 1].id) + 1;

    return lastId.toString();
};
