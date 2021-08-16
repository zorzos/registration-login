import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();
 
router.get('/', async (req, res) => {
    const users = await req.context.models.User.findAll();
    const usersWithoutPasswords = users.map(user => {
        delete user.dataValues.hash_password
        return user
    })
    return res.send(usersWithoutPasswords);
});

router.post('/register', async (req, res) => {
    let user;
    try {
        let hashPassword = bcrypt.hashSync(req.body.password, 15);
        req.body.hash_password = hashPassword
        await req.context.models.User.create(req.body);
        user = await req.context.models.User.findByLogin(req.body.email);
        delete user.dataValues.hash_password
        const token = jwt.sign(user.dataValues, process.env.MY_SECRET);
        res.set('Authorization', token);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }

    return res.send(user);
});

router.post('/login', async (req, res) => {
    let user;
    try {
        user = await req.context.models.User.findByLogin(req.body.email);
        if (user === null) {
            return res.status(404).json({ error });
        } else {
            const validCredentials = bcrypt.compareSync(req.body.password, user.hash_password);
            if (!validCredentials) {
                return res.status(500).json({ error: "Incorrect password" });
            } else {
                delete user.dataValues.hash_password
                const token = jwt.sign(user.dataValues, process.env.MY_SECRET);
                res.set('Authorization', token);
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
    
    return res.send(user);
});

router.post('/logout', async (req, res) => {
    return res.send("NEED TO IMPLEMENT LOGOUT ENDPOINT!");
});
 
export default router;