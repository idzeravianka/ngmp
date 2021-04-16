import { User } from '../models/user.model';
import { mockedUsers, incrementId } from './mocked-users';

class UserService {
    public findUserById(userId: string): User {
        const userIndex = this.findUserIndexById(userId);
        if (userIndex !== -1) return mockedUsers[userIndex];

        throw new Error('User not found');
    }

    public createUser(userData: User): void {
        const user: User = {
            ...userData,
            id: incrementId(mockedUsers),
            isDeleted: false
        };

        mockedUsers.push(user);
    }

    public deleteUser(userId: string): void {
        const userIndex = this.findUserIndexById(userId);

        if (userIndex !== -1) {
            mockedUsers[userIndex] = {
                ...mockedUsers[userIndex],
                isDeleted: true
            };
        } else {
            throw new Error('User not found');
        }
    }

    public updateUser(userId: string, userDataForUpdate: User): void {
        const userIndex = this.findUserIndexById(userId);

        if (userIndex !== -1) {
            mockedUsers[userIndex] = {
                ...mockedUsers[userIndex],
                ...userDataForUpdate
            };
        } else {
            throw new Error('User not found');
        }
    }

    public getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        const results = mockedUsers.reduce((acc: User[], user) => {
            const matchesSubstring = user.login.toLowerCase().includes(loginSubstring.toLowerCase());
            const limitIsNotExceeded = acc.length < limit;

            if (matchesSubstring && limitIsNotExceeded) acc.push(user);

            return acc;
        }, []);

        results.sort((a, b) => (a.login > b.login) ? 1 : -1);

        return results;
    }

    private findUserIndexById(userId: string): number {
        return mockedUsers.findIndex(user => user.id === userId);
    }
}

export default new UserService();
