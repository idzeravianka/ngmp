import Sequelize from 'sequelize';
import { sequelizeInstance } from '../data-access/sequelize-instance';
import { GroupModel } from './group.model';
import { UserModel } from './user.model';

const { Model, DataTypes } = Sequelize;


export interface UserGroup {
  id: number;
}

export class UserGroupModel extends Model<UserGroup> {}

UserGroupModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: 'user-group',
    timestamps: false,
    sequelize: sequelizeInstance
});

GroupModel.belongsToMany(UserModel, { through: UserGroupModel, onDelete: 'CASCADE' });
UserModel.belongsToMany(GroupModel, { through: UserGroupModel, onDelete: 'CASCADE' });
