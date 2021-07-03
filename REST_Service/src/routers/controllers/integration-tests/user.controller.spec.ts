import supertest from 'supertest';
import { app } from '../../../index';
import { UserModel } from '../../../models';

jest.mock('../../../models/user.model', () => ({
    UserModel: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        belongsToMany: jest.fn()
    }
}));

jest.mock('../../../models/group.model', () => ({
    GroupModel: {
        belongsToMany: jest.fn()
    }
}));

describe('UserController', () => {
    let token: string;
    const testUser = {
        login: 'testLogin1',
        password: 'testPassword1',
        age: 7
    };

    beforeAll((done) => {
        (UserModel.findOne as jest.Mock).mockReturnValue({});
        supertest(app)
            .post('/auth/login')
            .send({
                login: 'testLogin1',
                password: 'testPassword1'
            })
            .end((err, res) => {
                if (err) {
                    return;
                }
                token = res.body.token;
                done();
            });
    });
    describe('#getUser', () => {
        describe('when user exist', () => {
            beforeEach(() => {
                (UserModel.findByPk as jest.Mock).mockImplementation(() => testUser);
            });
            it('should return user', async () => {
                await supertest(app)
                    .get('/user/get-user/5')
                    .set('Authorization', `Bearer ${token}`)
                    .then((res) => {
                        expect(res.status).toBe(200);
                        expect(res.body).toEqual(testUser);
                    });
            });
        });

        describe('when user does not exist', () => {
            beforeEach(() => {
                (UserModel.findByPk as jest.Mock).mockImplementation(() => {
                    throw new Error('test');
                });
            });
            it('should return user', async () => {
                await supertest(app)
                    .get('/user/get-user/5')
                    .set('Authorization', `Bearer ${token}`)
                    .then((res) => {
                        expect(res.status).toBe(404);
                        expect(res.body).toEqual({ error: 'test' });
                    });
            });
        });
    });
    describe('#createUser', () => {
        describe('when user created successfully', () => {
            beforeEach(() => {
                (UserModel.findOne as jest.Mock).mockReturnValue(null);
            });
            it('should return success status', async () => {
                await supertest(app)
                    .post('/user/create-user')
                    .send(testUser)
                    .set('Authorization', `Bearer ${token}`)
                    .then((res) => {
                        console.log(res.body);
                        expect(res.status).toBe(200);
                        expect(res.body).toEqual('OK');
                    });
            });
        });

        describe('when the error occurred', () => {
            beforeEach(() => {
                (UserModel.findOne as jest.Mock).mockReturnValue(null);
                (UserModel.create as jest.Mock).mockImplementation(() => {
                    throw new Error('test');
                });
            });
            it('should return user', async () => {
                await supertest(app)
                    .post('/user/create-user')
                    .send(testUser)
                    .set('Authorization', `Bearer ${token}`)
                    .then((res) => {
                        expect(res.status).toBe(404);
                        expect(res.body).toEqual({ error: 'test' });
                    });
            });
        });
    });
});
