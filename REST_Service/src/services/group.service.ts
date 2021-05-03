import { sequelizeInstance } from '../data-access/sequelize-instance';
import { Group, GroupModel, UserModel } from '../models';

class GroupService {
    public async findGroupById(groupId: string): Promise<GroupModel | null> {
        return await GroupModel.findByPk(groupId, { raw: true });
    }

    public async getAllGroup(): Promise<GroupModel[]> {
        return await GroupModel.findAll({ raw: true });
    }

    public async createGroup(groupData: Group): Promise<void> {
        await GroupModel.create({
            ...groupData
        });
    }

    public async deleteGroup(groupId: string): Promise<void> {
        await GroupModel.destroy(
            { where: { id: groupId } },
        );
    }

    public async updateGroup(groupId: string, groupDataForUpdate: Group): Promise<void> {
        await GroupModel.update(
            { ...groupDataForUpdate },
            { where: { id: groupId } }
        );
    }

    public async addUsersToGroup(groupId: number, userIds: number[]): Promise<void> {
        const transaction = await sequelizeInstance.transaction();
        try {
            const users = await UserModel.findAll({
                where: {
                    id: userIds
                },
                transaction
            });

            users.forEach(async user => {
                await (user as any).addGroupModel(groupId, {}, { transaction });
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new Error(error);
        }
    }
}

export default new GroupService();
