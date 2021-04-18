import Sequelize from 'sequelize';
import { User, UserModel } from '../models';

const { Op } = Sequelize;

class UserService {
    public async findUserById(userId: string): Promise<UserModel | null> {
        return await UserModel.findByPk(userId, { raw: true });
    }

    public async createUser(userData: User): Promise<void> {
        await UserModel.create({
            ...userData,
            isDeleted: false
        });
    }

    public async deleteUser(userId: string): Promise<void> {
        await UserModel.destroy(
            { where: { id: userId } },
        );
    }

    public async updateUser(userId: string, userDataForUpdate: User): Promise<void> {
        await UserModel.update(
            { ...userDataForUpdate },
            { where: { id: userId } }
        );
    }

    public async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserModel[]> {
        return await UserModel.findAll({
            limit,
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}%`
                }
            },
            order: [
                ['login', 'ASC']
            ],
            raw: true
        });
    }
}

export default new UserService();
