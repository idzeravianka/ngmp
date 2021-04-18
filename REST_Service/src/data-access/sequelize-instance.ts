
import { Sequelize } from 'sequelize';
import { env } from '../configs/env';

export const sequelizeInstance = new Sequelize(env.dbUrl);
