import Sequelize from 'sequelize';
import { User, UserModel } from '../models';
import { UnauthorizedError } from '../custom-errors/invalid-credentials.error';
import { AuthenticationService } from './authentication.service';

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

    public async login(login: string, password: string): Promise<string | UnauthorizedError> {
        const user = await UserModel.findOne({ where: { login, password } });
        if (!user) throw new UnauthorizedError('Invalid credentials');
        return AuthenticationService.generateToken(login);
    }
}

export default new UserService();
