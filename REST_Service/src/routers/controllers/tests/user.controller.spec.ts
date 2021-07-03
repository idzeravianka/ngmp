import userController from '../user.controller';
import { Request, Response } from 'express';
import userService from '../../../services/user.service';
import { controllerLogger } from '../../../logger/controller-loger';

jest.mock('../../../services/user.service', () => ({
    findUserById: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    getAutoSuggestUsers: jest.fn(),
    login: jest.fn(),
    generateToken: jest.fn()
}));

jest.mock('../../../logger/controller-loger', () => ({
    controllerLogger: jest.fn()
}));

jest.mock('../../../logger/execution-method-time-logger', () => ({
    ExecutionMethodTimeLogger: jest.fn()
}));

describe('UserController', () => {
    let request: Partial<Request>;
    let response: Partial<Response>;
    const errorText = 'test';

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    describe('#getUserById', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                }
            };
        });

        describe('when user exist', () => {
            const expectedUser = {};
            beforeEach(() => {
                (userService.findUserById as jest.Mock).mockReturnValue(expectedUser);
            });
            it('should return user',  async () => {
                await userController.getUserById(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith(expectedUser);
            });
        });

        describe('when user does not exist', () => {
            beforeEach(() => {
                (userService.findUserById as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });
            it('should log error', async () => {
                await userController.getUserById(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('findUserById', '1', 'test');
            });
            it('should return error', async () => {
                await userController.getUserById(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#createUser', () => {
        beforeEach(() => {
            request = {
                body: {
                    login: 'testLogin',
                    password: 'testPassword'
                }
            };
        });

        describe('when user created successfully', () => {
            it('should return success status', async () => {
                await userController.createUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while creating user', () => {
            beforeEach(() => {
                (userService.createUser as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await userController.createUser(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('createUser', '{"login":"testLogin","password":"testPassword"}', 'test');
            });
            it('should return error', async () => {
                await userController.createUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#deleteUser', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                }
            };
        });

        describe('when user deleted successfully', () => {
            it('should return success status', async () => {
                await userController.deleteUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while deleting user', () => {
            beforeEach(() => {
                (userService.deleteUser as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await userController.deleteUser(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('deleteUser', '1', 'test');
            });
            it('should return error', async () => {
                await userController.deleteUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#updateUser', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                },
                body: {}
            };
        });

        describe('when user updated successfully', () => {
            it('should return success status', async () => {
                await userController.updateUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while updating user', () => {
            beforeEach(() => {
                (userService.updateUser as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await userController.updateUser(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('updateUser', '1, {}', 'test');
            });
            it('should return error', async () => {
                await userController.updateUser(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('getAutoSuggestUsers', () => {
        beforeEach(() => {
            request = {
                query: {
                    loginSubstring: 'test',
                    limit: '1'
                }
            };
        });

        describe('when users are found successfully', () => {
            beforeEach(() => {
                (userService.getAutoSuggestUsers as jest.Mock).mockReturnValue([]);
            });
            it('should return success status with users', async () => {
                await userController.getAutoSuggestUsers(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith([]);
            });
        });

        describe('when an error occurred while searching for users', () => {
            beforeEach(() => {
                (userService.getAutoSuggestUsers as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await userController.getAutoSuggestUsers(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('getAutoSuggestUsers', 'test, 1', 'test');
            });
            it('should return error', async () => {
                await userController.getAutoSuggestUsers(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });
});
