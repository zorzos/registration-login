import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';
console.log("Rafail Zorzos");
 
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
    await models.User.create({
        email: 'rafail.zorzos@gmail.com',
        name: 'Rafail Zorzos',
        password: '123456'
    });
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        reBuildDatabase();
    }

    app.listen(process.env.PORT, () =>
        console.log(`Registration/Login app listening on port ${process.env.PORT}.`),
    );
});