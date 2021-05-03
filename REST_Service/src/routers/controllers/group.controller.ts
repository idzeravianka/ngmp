import { Request, Response } from 'express';
import groupService from '../../services/group.service';

class GroupController {
    public async getGroupById(req: Request, res: Response): Promise<void> {
        try {
            const group = await groupService.findGroupById(req.params.id);
            res.status(200).json(group);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async getAllGroup(req: Request, res: Response): Promise<void> {
        try {
            const group = await groupService.getAllGroup();
            res.status(200).json(group);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async createGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.createGroup(req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async deleteGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.deleteGroup(req.params.id);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async updateGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.updateGroup(req.params.id, req.body);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }

    public async addUsersToGroup(req: Request, res: Response): Promise<void> {
        try {
            await groupService.addUsersToGroup(req.body.groupId, req.body.userIds);
            res.status(200).json('OK');
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    }
}

export default new GroupController();
