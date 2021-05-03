import Sequelize from 'sequelize';
import { sequelizeInstance } from '../data-access/sequelize-instance';

const { Model, DataTypes } = Sequelize;

export interface User {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export class UserModel extends Model<User> {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false,
    sequelize: sequelizeInstance
});
