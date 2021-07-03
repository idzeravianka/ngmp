import groupController from '../group.controller';
import { Request, Response } from 'express';
import groupService from '../../../services/group.service';
import { controllerLogger } from '../../../logger/controller-loger';

jest.mock('../../../services/group.service', () => ({
    findGroupById: jest.fn(),
    getAllGroup: jest.fn(),
    createGroup: jest.fn(),
    deleteGroup: jest.fn(),
    updateGroup: jest.fn(),
    addUsersToGroup: jest.fn()
}));

jest.mock('../../../logger/controller-loger', () => ({
    controllerLogger: jest.fn()
}));

jest.mock('../../../logger/execution-method-time-logger', () => ({
    ExecutionMethodTimeLogger: jest.fn()
}));

describe('GroupController', () => {
    let request: Partial<Request>;
    let response: Partial<Response>;
    const errorText = 'test';

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    describe('#getGroupById', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                }
            };
        });

        describe('when group exist', () => {
            const expectedGroup = {};
            beforeEach(() => {
                (groupService.findGroupById as jest.Mock).mockReturnValue(expectedGroup);
            });
            it('should return group',  async () => {
                await groupController.getGroupById(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith(expectedGroup);
            });
        });

        describe('when group does not exist', () => {
            beforeEach(() => {
                (groupService.findGroupById as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });
            it('should log error', async () => {
                await groupController.getGroupById(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('findGroupById', '1', 'test');
            });
            it('should return error', async () => {
                await groupController.getGroupById(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#getAllGroup', () => {
        describe('when all groups are found', () => {
            const expectedGroup: [] = [];
            beforeEach(() => {
                (groupService.getAllGroup as jest.Mock).mockReturnValue(expectedGroup);
            });
            it('should return group',  async () => {
                await groupController.getAllGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith(expectedGroup);
            });
        });

        describe('when there was some error', () => {
            beforeEach(() => {
                (groupService.getAllGroup as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });
            it('should log error', async () => {
                await groupController.getAllGroup(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('getAllGroup', 'null', 'test');
            });
            it('should return error', async () => {
                await groupController.getAllGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#createGroup', () => {
        beforeEach(() => {
            request = {
                body: {}
            };
        });

        describe('when group created successfully', () => {
            it('should return success status', async () => {
                await groupController.createGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while creating group', () => {
            beforeEach(() => {
                (groupService.createGroup as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await groupController.createGroup(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('createGroup', '{}', 'test');
            });
            it('should return error', async () => {
                await groupController.createGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#deleteGroup', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                }
            };
        });

        describe('when group deleted successfully', () => {
            it('should return success status', async () => {
                await groupController.deleteGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while deleting group', () => {
            beforeEach(() => {
                (groupService.deleteGroup as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await groupController.deleteGroup(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('deleteGroup', '1', 'test');
            });
            it('should return error', async () => {
                await groupController.deleteGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#updateGroup', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: '1'
                },
                body: {}
            };
        });

        describe('when group updated successfully', () => {
            it('should return success status', async () => {
                await groupController.updateGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while updating group', () => {
            beforeEach(() => {
                (groupService.updateGroup as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await groupController.updateGroup(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('updateGroup', '1, {}', 'test');
            });
            it('should return error', async () => {
                await groupController.updateGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });

    describe('#addUsersToGroup', () => {
        beforeEach(() => {
            request = {
                body: {
                    groupId: '1',
                    userIds: ['1']
                }
            };
        });

        describe('when users are successfully added to group', () => {
            it('should return success status with users', async () => {
                await groupController.addUsersToGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(200);
                expect(response.json).toHaveBeenCalledWith('OK');
            });
        });

        describe('when an error occurred while while users are being added to group', () => {
            beforeEach(() => {
                (groupService.addUsersToGroup as jest.Mock).mockImplementation(() => {
                    throw new Error(errorText);
                });
            });

            it('should log error', async () => {
                await groupController.addUsersToGroup(request as Request, response as Response);
                expect(controllerLogger).toHaveBeenCalledWith('addUsersToGroup', '1, 1', 'test');
            });
            it('should return error', async () => {
                await groupController.addUsersToGroup(request as Request, response as Response);
                expect(response.status).toHaveBeenCalledWith(404);
                expect(response.json).toHaveBeenCalledWith({ error: errorText });
            });
        });
    });
});
