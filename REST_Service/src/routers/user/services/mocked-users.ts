import { User } from '../models/user.model';

export const mockedUsers: User[] = [
    {
        id: '0',
        login: 'testLogin2',
        password: 'testPassword',
        age: 21,
        isDeleted: false
    },
    {
        id: '1',
        login: 'testLogin3',
        password: 'testPassword',
        age: 21,
        isDeleted: false
    },
    {
        id: '2',
        login: 'testLogin1',
        password: 'testPassword',
        age: 21,
        isDeleted: false
    }
];
