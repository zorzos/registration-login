import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';
import bcrypt from 'bcrypt';

import typeDefinitions from './graphql/typeDefinitions';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
    context: {
        models
    }
});

await server.start();
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    req.context = { models };
    next();
});
app.use('/users', routes.user);

const eraseDatabaseOnSync = true
const reBuildDatabase = async () => {
    let hashPassword = bcrypt.hashSync('a1234567', 15);
    await models.User.create({
        email: 'rafail.zorzos@gmail.com',
        name: 'Rafail Zorzos',
        hash_password: hashPassword
    });
};

server.applyMiddleware({ app, path: '/graphql' });
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        reBuildDatabase();
    }
    app.listen(process.env.PORT, () =>
        console.log('Registration/Login app started'),
        console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`)
    );
});