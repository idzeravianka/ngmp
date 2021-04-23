
import { Sequelize } from 'sequelize';

export const sequelizeInstance = new Sequelize(process.env.DB_URL as string);
