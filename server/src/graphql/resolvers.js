import jwt from 'jsonwebtoken'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import 'dotenv/config'
const secret = process.env.MY_SECRET;

const resolvers = {
    Query: {
        login: async (
            parent,
            { email, password },
            { models }
        ) => {
            const user = await models.User.findByLogin(email);

            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials, please try again.'
                )
            }

            const isValid = await bcrypt.compareSync(password, user.hash_password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password');
            }

            const token = jwt.sign(user.dataValues, secret);
            
            return {
                ...user.dataValues,
                token
            };
        },
        logout: (
            parent,
            { email, token }
        ) => {
            let decoded = "";
            try {
                decoded = jwt.verify(token, secret);
                console.log('decoded', decoded);
            } catch (e) {
                return -1;
            }

            if (decoded.email !== email) {
                return -1
            }
            return 0;
        }
    },

    Mutation: {
        register: async (
            parent,
            { email, password, name },
            { models }
        ) => {
            let hashPassword = bcrypt.hashSync(password, 15);
            await models.User.create({ email, hash_password: hashPassword, name});
            const user = await models.User.findByLogin(email);
            // delete user.dataValues.hash_password;
            console.log('user', user);
            return user;
        }
    }
}

export default resolvers;