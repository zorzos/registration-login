import { Router } from 'express';
 
const router = Router();
 
router.get('/', async (req, res) => {
    const users = await req.context.models.User.findAll();
    return res.send(users);
});

router.post('/register', async (req, res) => {
    let user;
    try {
        const newUser = await req.context.models.User.create(req.body);
        user = await req.context.models.User.findByLogin(req.body.email);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }

    return res.send(user);
});

router.post('/login', async (req, res) => {
    let message;
    try {
        message = await req.context.models.User.findByLogin(req.body.email);
        if (message === null) {
            return res.status(500).json({ error: "Inexistent user" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
    
    return res.send(message);
});

router.post('/logout', async (req, res) => {
    return res.send("NEED TO IMPLEMENT LOGOUT ENDPOINT!");
});
 
export default router;