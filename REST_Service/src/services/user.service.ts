import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
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

    public async login(login: string, password: string): Promise<string | null> {
        const user = await UserModel.findOne({ where: { login, password } });
        if (!user) return null;
        return UserService.generateToken(login);
    }

    public static generateToken(login: string): string {
        return jwt.sign(login, process.env.SECRET_KEY as string);
    }
}

export default new UserService();
