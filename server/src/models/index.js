import Sequelize from 'sequelize';

import user from './users'

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    },
);

const models = {
    User: user(sequelize, Sequelize.DataTypes)
};

export { sequelize };

export default models;