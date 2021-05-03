import Sequelize from 'sequelize';
import { sequelizeInstance } from '../data-access/sequelize-instance';
const { Model, DataTypes } = Sequelize;

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
  id: number;
  name: string;
  permissions: Array<Permission>;
}

export class GroupModel extends Model<Group> {}

GroupModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    tableName: 'groups',
    timestamps: false,
    sequelize: sequelizeInstance
});
