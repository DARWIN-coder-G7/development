import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    //save the new user to DB
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        //I want to Add a First TODO for the user
        const defaultTodo = `Hello :) Add Your First Todo! `;
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        });
        //Create a Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //save the new user to DB
    try {

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });
        //validate User
        if (!user)
            return res.status(404).send({ message: 'User not Found' });
        //Validate Password
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid)
            return res.status(401).send({ message: "Password is Incorrect" });
        //Create a Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

export default router;