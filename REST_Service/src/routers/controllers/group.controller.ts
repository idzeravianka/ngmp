import { Request, Response } from 'express';
import groupService from '../../services/group.service';
import { controllerLogger } from '../../logger/controller-loger';
import { ExecutionMethodTimeLogger } from '../../logger/execution-method-time-logger';

class GroupController {
    @ExecutionMethodTimeLogger()
    public async getGroupById(req: Request, res: Response): Promise<void> {
        try {
            const group = await groupService.findGroupById(req.params.id);
            res.status(200).json(group);
        } catch (e) {
            controllerLogger('findGroupById', req.params.id, e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async getAllGroup(req: Request, res: Response): Promise<void> {
        try {
            const group = await groupService.getAllGroup();
            res.status(200).json(group);
        } catch (e) {
            controllerLogger('getAllGroup', 'null', e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async createGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.createGroup(req.body);
            res.status(200).json('OK');
        } catch (e) {
            controllerLogger('createGroup', JSON.stringify(req.body), e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async deleteGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.deleteGroup(req.params.id);
            res.status(200).json('OK');
        } catch (e) {
            controllerLogger('deleteGroup', req.params.id, e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async updateGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.updateGroup(req.params.id, req.body);
            res.status(200).json('OK');
        } catch (e) {
            controllerLogger('updateGroup', `${req.params.id}, ${JSON.stringify(req.body)}`, e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async addUsersToGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.addUsersToGroup(req.body.groupId, req.body.userIds);
            res.status(200).json('OK');
        } catch (e) {
            controllerLogger('addUsersToGroup', `${req.body.groupId}, ${req.body.userIds}`, e.message);
            res.status(404).json({ error: e.message });
        }
    }
}

export default new GroupController();
